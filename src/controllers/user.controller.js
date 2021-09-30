import dotenv from 'dotenv';
// import jwt_decode from 'jwt-decode';
import authenticator from '../helpers/authenticator';
import response from '../helpers/response.helper';
import EncryptPassword from '../helpers/Encryptor';
import GenerateToken from '../helpers/token.helper';
import generateEmail from '../emailTemplates/verification';
import generateResetEmail from '../emailTemplates/recoverEmail';
import sendMail from '../helpers/emails';
import AWS from 'aws-sdk';
// import profileHelper from '../helpers/profile.helper';
import UserServices from '../services/user.service';
import checkPassword from '../middlewares/user.middleware';
import db from '../database/models';
import comparePassword from '../helpers/Decryptor';

dotenv.config();





/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class userController {

  static async signup(req, res) {
    try {
      const { firstName, lastName, phoneNumber, authType, email, gender, state, country } = req.body;
      const password = EncryptPassword(req.body.password);
      const code = Math.floor(100000 + Math.random() * 900000);
      const existingUser = await UserServices.findExistingUser(email, phoneNumber);
      if (existingUser) {
        return response.errorMessage(res, 'user already exist', 409);
      }
        const token = GenerateToken({
          email,
          authType,
          isVerified: false,
        });
        const NewUser = {
          firstName,
          lastName,
          phoneNumber,
          email,
          gender,
          password,
          code,
          state,
          country,
          authType,
          isVerified: false,
          isBlocked: false,
        };
         const verificationEmail = generateEmail(NewUser);
        await sendMail(
          process.env.SENDGRID_API_KEY,
          email,
          process.env.SENDER_EMAIL,
          'Diatron Health',
          verificationEmail
        );
        const data = {
          token,
        };

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const message = `Hi ${firstName}, Welcome to Diatron Health, Your Verification code is ${code}!`

        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+${phoneNumber}`
            })
            .then(message => console.log("Phone Message Delivered"));

      await db.user.create(NewUser);
      return response.successMessage(
          res,
          'user created successfully, proceed to verify your account from your email',
          201,
          data
      );

    } catch (e) {
        console.log(e)
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * Logs in a user by checking if they exist in the database
   * and if the supplied password matches the stored password
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async signIn(req, res) {
    await checkPassword(req, res);
  }


    /**
     * resending a user code to phone number
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @returns {Object} A user object with selected fields
     */
    static async resendCode(req, res) {
        try {
            const { phoneNumber } = req.body;
            const userToUpdate = await UserServices.findUserByPhone(phoneNumber);
            const { firstName } = userToUpdate
            if (!userToUpdate) {
                return response.errorMessage(res, 'Account not found', 404);
            }
            if (userToUpdate && userToUpdate.isVerified) {
                return response.errorMessage(res, 'user already activated', 409);
            }

            const code = Math.floor(100000 + Math.random() * 900000);
            const from = "Diatron APP"
            const to = `+${phoneNumber}`
            const text = `Hi ${firstName} to Diatron Health, Your Verification code is ${code} !`

            await vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })

            const data = {
                code,
            };

            await userToUpdate.update(data);
            return response.successMessage(
                res,
                'Account code sent successfully, Please proceed to verify your account from your phone',
                201
            );
        } catch (e) {
            return response.errorMessage(res, e.message, 400);
        }
    }

  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async activateUserByCode(req, res) {
    const activate = {
      isVerified: true,
    };
    const { phoneNumber, code } = req.body;
    try {
      const updateUser = await UserServices.activeUser(phoneNumber, code, activate);
      const data = {
        isVerified: true,
      };
      if (updateUser.status === 200) {
        return response.successMessage(res, updateUser.message, updateUser.status, data);
      }
      if (updateUser.status === 409) {
        return response.errorMessage(res, updateUser.message, updateUser.status);
      }
      if (updateUser.status === 404) {
        return response.errorMessage(res, updateUser.message, updateUser.status);
      }
    } catch (e) {
      return response.errorMessage(res, e.message, 404);
    }
  }


    /**
     * send a reset password link to the user
     * @param {Object} req user request
     * @param {Object} res user response
     * @returns {Object} return user response
     */
    static async sendResetPasswordCode(req, res) {
        const { phoneNumber } = req.body;
        const result = await UserServices.findUserByPhone(phoneNumber);
        const { firstName } = result
        if (result !== null) {
            const code = Math.floor(100000 + Math.random() * 900000);
            const from = "Diatron APP"
            const to = `+${phoneNumber}`
            const text = `Hello ${firstName} from Diatron Health, Your Verification code is ${code}`

            await vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })
            const data = {
                code
            }
            await result.update(data);

            return response.successMessage(res,
                'Account code sent successfully, Please proceed to reset password',
                200);
        }
        return response.errorMessage(res, 'user not found!', 404);
    }

    /**
     * It used to reset a user password
     * @param {object} req user request
     * @param {object} res user response
     * @returns {object} result
     */
    static async resetPassword(req, res) {
        //code needs to be used as well to reset password
        const { password, phoneNumber, confirmPassword , code} = req.body;
        const codes = Math.floor(100000 + Math.random() * 900000);
        if (password !== confirmPassword) {
            return response.errorMessage(res, 'Password does not match!', 400);
        }

        const pass = {
            password: EncryptPassword(req.body.password),
            code: codes
        };

        const user = await UserServices.findUserByPhoneAndCode(phoneNumber,code)

        if(user === null){
            return response.errorMessage(res, 'user not found!', 404);
        }
        if (!user.isVerified) {
            return response.errorMessage(res, 'Account is not verified', 401);
        }
        if (user !== null) {
            await user.update(pass);
            return response.successMessage(res, 'Password has been changed successfully', 200);
        }
    }


  // static async changePassword(req, res) {
  //   try {
  //     const { oldPassword } = req.body;
  //     const password = EncryptPassword(req.body.newPassword);
  //     const { id } = req.user;
  //     const user = await db.user.findByPk(id);
  //     if (!comparePassword(oldPassword, user.password)) {
  //       const status = 401;
  //       return response.errorMessage(res, 'Incorrect Password', status);
  //     }
  //     if (!user) {
  //       return {
  //         status: 404,
  //         message: 'Incorrect Password',
  //       };
  //     }
  //     await user.update({ password });
  //     return response.successMessage(res, 'Password Changed Successfully', 200);
  //   } catch (e) {
  //     return response.errorMessage(res, e.message, 400);
  //   }
  // }



  // /**
  //  * Logs in a user using google
  //  * and if the supplied password matches the stored password
  //  * @param {Object} req The request object
  //  * @param {Object} res The response object
  //  * @returns {Object} A user object with selected fields
  //  * excluing the password
  //  */
  //
  // static async googleUp(req, res) {
  //   try {
  //     const tokens = req.headers.authorization.split(' ')[1];
  //     const decoded = jwt_decode(tokens);
  //     const {
  //       email, given_name, family_name, picture
  //     } = decoded;
  //     const { category, password } = req.body;
  //     const pass = EncryptPassword(password);
  //     const token = GenerateToken({ email, isVerified: true, category });
  //     const userData = {
  //       firstName: given_name,
  //       lastName: family_name,
  //       email,
  //       password: pass,
  //       category,
  //       authType: 'google',
  //       isVerified: true,
  //       isBlocked: false,
  //       isAdmin: false,
  //     };
  //     const userCreated = await db.user.findOne({ where: { email } });
  //
  //     if (!userCreated) {
  //       const user = await db.user.create(userData);
  //       await db.profile.create({
  //         userId: user.id,
  //         avatar: picture,
  //       });
  //     }
  //     const data = {
  //       token,
  //     };
  //     return response.successMessage(res, 'user created successfully', 201, data);
  //   } catch (e) {
  //     return response.errorMessage(res, 'Invalid Sign up details', 400);
  //   }
  // }
  //
  // /**
  //  * Logs in a user by checking if they exist in the database
  //  * and if the supplied password matches the stored password
  //  * @param {Object} req The request object
  //  * @param {Object} res The response object
  //  * @returns {Object} A user object with selected fields
  //  * excluing the password
  //  */
  // static async googleIn(req, res) {
  //   try {
  //     const tokens = req.headers.authorization.split(' ')[1];
  //     const decoded = jwt_decode(tokens);
  //     const { email } = decoded;
  //     const user = await UserServices.findUserByEmail(email);
  //     if (!user) {
  //       return response.errorMessage(res, 'Invalid Login detail', 401);
  //     }
  //     const { category } = user;
  //     const token = GenerateToken({
  //       email,
  //       isVerified: user.isVerified,
  //       id: user.id,
  //       category: user.category,
  //     });
  //     const data = {
  //       token,
  //       role: category,
  //     };
  //     return response.successMessage(res, 'user logged in successfully', 201, data);
  //   } catch (e) {
  //     return response.errorMessage(res, 'Invalid Sign in details', 400);
  //   }
  // }

  // /**
  //  * It activate a user account by updating isVerified attribute to true
  //  * @param {int} req This is the parameter(user id) that will be passed in url
  //  * @param {object} res This is a response will be send to the user
  //  * @returns {object} return object which include status and message
  //  */
  //
  // static async updatedUserEmail(req, res) {
  //   try {
  //     const activate = {
  //       isVerified: true,
  //     };
  //     const token = req.query.authorization;
  //     const { payload } = authenticator.verifyToken(token, process.env.JWT_KEY);
  //     const { email } = payload;
  //     const updateUser = await UserServices.verifyUser(email, activate);
  //     const ua = useragent.is(req.headers['user-agent']);
  //     if (ua.andriod && (ua.chrome || ua.opera || ua.firefox || ua.mozilla) === false) {
  //       return response.successMessage(
  //         res,
  //         updateUser.message,
  //         updateUser.status,
  //         'isVerified:True'
  //       );
  //     }
  //     if (updateUser.status === 200) {
  //       return res.redirect(
  //         `${process.env.FRONT_END_HOST}?verification=success&message=account%20successfully%20activated`
  //       );
  //     }
  //     if (updateUser.status === 409) {
  //       return res.redirect(
  //         `${process.env.FRONT_END_HOST}?verification=failed&message=activation%20link%20expired`
  //       );
  //     }
  //   } catch (e) {
  //     return response.errorMessage(res, e.message, 400);
  //   }
  // }

  // /**
  //  * This logs out a user by updating token attribute to null
  //  * @param {object} req This is a request coming from a user
  //  * @param {object} res This is a response will be sent to a user
  //  * @returns {object} return promise object
  //  */
  // static async logout(req, res) {
  //   await UserServices.updateUserId(req.user.id, { token: null });
  //   return response.successMessage(
  //     res,
  //     'User is successfully logged out.',
  //     200,
  //     'Proceed to signin again'
  //   );
  // }

  // /**
  //  *login function to get profile from google and facebook and manipulate it
  //  *
  //  *
  //  *@param {object} accessToken response
  //  *@param {object} refreshToken response
  //  *@param {object} profile object
  //  *@param {object} done callback
  //  *@returns {object} object
  //  */
  // static async googlePlusAuth(accessToken, refreshToken, profile, done) {
  //   try {
  //     const userData = {
  //       firstName: profile.name.givenName,
  //       lastName: profile.name.familyName,
  //       email: profile.emails[0].value,
  //       avatar: profile.photos[0].value,
  //     };
  //     const userCreated = await UserServices.findUserByEmail(userData.email);
  //     done(null, userCreated.dataValues);
  //   } catch (error) {
  //     done(error, false);
  //   }
  // }
  //
  // /**
  //  * It activate a user account by updating isVerified attribute to true
  //  * @param {int} req This is the parameter(user id) that will be passed in url
  //  * @param {object} res This is a response will be send to the user
  //  * @returns {object} return object which include status and message
  //  */
  // static async viewProfile(req, res) {
  //   const { id } = req.user;
  //   return profileHelper.getProfileData(id, req, res);
  // }
  //
  // /**
  //  * send a reset password link to the user
  //  * @param {Object} req user request
  //  * @param {Object} res user response
  //  * @returns {Object} return user response
  //  */
  // static async sendResetPasswordLink(req, res) {
  //   const { field } = req.body;
  //   const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  //   if (field.match(pattern)) {
  //     const email = field;
  //     const result = await UserServices.findUserByEmail(email);
  //     if (result !== null) {
  //       const token = GenerateToken({ email, isVerified: result.isVerified, id: result.id });
  //       const verificationEmail = generateResetEmail(token);
  //       await sendMail(
  //         process.env.SENDGRID_API_KEY,
  //         email,
  //         process.env.SENDER_EMAIL,
  //         'Recover Email',
  //         verificationEmail
  //       );
  //       return response.successMessage(
  //         res,
  //         'Email sent please check you email to reset your password',
  //         200,
  //         token
  //       );
  //     }
  //     return response.errorMessage(res, 'Account does not exist', 404);
  //   }
  //   const phoneNumber = field;
  //   const code = Math.floor(100000 + Math.random() * 900000);
  //   const upDated = await UserServices.updateUserByPhone(phoneNumber, code);
  //   if (upDated !== null) {
  //     // send Sms
  //     const mobile = `+${phoneNumber}`;
  //     const message = `Welcome to Oyoyo App, your code for Password reset is ${code}`;
  //
  //     // Your login credentials
  //     const sms = AfricasTalking.SMS;
  //     const options = {
  //       to: mobile,
  //       message,
  //     };
  //     sms
  //       .send(options)
  //       .then((res) => res)
  //       .catch((e) => e);
  //     return response.successMessage(
  //       res,
  //       'A message has been sent to you please check your phone to reset your password',
  //       200,
  //       'Verification Message sent'
  //     );
  //   }
  //   return response.errorMessage(res, 'Account does not exist', 404);
  // }
  //
  // /**
  //  * It activate a user account by updating isVerified attribute to true
  //  * @param {int} req This is the parameter(user id) that will be passed in url
  //  * @param {object} res This is a response will be send to the user
  //  * @returns {object} return object which include status and message
  //  */
  // static async editProfile(req, res) {
  //   try {
  //     const { id } = req.user;
  //     const user = await db.profile.findOne({ where: { userId: id }, include: ['cardDetails'] });
  //     const customer = await db.Subscriptions.findOne({ where: { userId: id } });
  //     let activeSubs;
  //     if (!customer) activeSubs = null;
  //     if (customer) {
  //       const { data: subscriptions = [] } = await getUserSubscriptions(customer.subscriptionId);
  //       activeSubs = subscriptions.filter((x) => x.status === 'active');
  //     }
  //     const reUser = {
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       otherName: req.body.otherName,
  //       phoneNumber: req.body.phoneNumber,
  //       email: req.body.email,
  //     };
  //     const { dataValues: updatedUser } = await user.update(reUser);
  //     const { dataValues: updatedProfile } = await user.update(req.body);
  //     const datas = { ...updatedUser, ...updatedProfile };
  //     const data = profileHelper.chooseProfileDatas(id, datas, activeSubs);
  //     return response.successMessage(res, 'User Profile is Updated', 200, data);
  //   } catch (e) {
  //     return response.errorMessage(res, e.message, 400);
  //   }
  // }
  //
  // /**
  //  * It used to reset a user password
  //  * @param {object} req user request
  //  * @param {object} res user response
  //  * @returns {object} result
  //  */
  // static resetPasswordByPhone(req, res) {
  //   try {
  //     const { code } = req.body;
  //     if (!code) {
  //       return response.errorMessage(res, ' code is required', 400);
  //     }
  //     if (req.body.password !== req.body.confirmPassword) {
  //       return response.errorMessage(res, 'Password does not match!', 400);
  //     }
  //     const encryptPassword = EncryptPassword(req.body.password);
  //     UserServices.resetPasswordPh(req, res, encryptPassword, code);
  //   } catch (e) {
  //     return response.errorMessage(res, e.message, 400);
  //   }
  // }
  //
  // /**
  //  * It used to reset a user password
  //  * @param {object} req user request
  //  * @param {object} res user response
  //  * @returns {object} result
  //  */
  // static resetPassword(req, res) {
  //   const { email } = req.user;
  //   const token = req.query.authorization;
  //   if (req.body.password !== req.body.confirmPassword) {
  //     return response.errorMessage(res, 'Password does not match!', 400);
  //   }
  //   const newPassword = EncryptPassword(req.body.password);
  //   UserServices.resetPassword(req, res, email, newPassword, token);
  // }
  //
  // /**
  //  * It activate a user account by updating isVerified attribute to true
  //  * @param {int} req This is the parameter(user id) that will be passed in url
  //  * @param {object} res This is a response will be send to the user
  //  * @returns {object} return object which include status and message
  //  */
  // static async updateRole(req, res) {
  //   try {
  //     const { category } = req.body;
  //     const { id } = req.body;
  //     const roleToUpdate = { category: category.toLowerCase() };
  //     const getRole = await UserServices.getRole(category);
  //     if (getRole) {
  //       const data = await UserServices.updateUserById(id, roleToUpdate);
  //       const userData = data.getDataValue('category');
  //       return response.successMessage(res, 'User Role successfully updated', 200, {
  //         role: userData,
  //       });
  //     }
  //   } catch (e) {
  //     return response.errorMessage(res, e.message, 400);
  //   }
  // }
}

export default userController;
