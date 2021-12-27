import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import EncryptPassword from '../helpers/Encryptor';
import GenerateToken from '../helpers/token.helper';
import generateEmail from '../emailTemplates/verification';
import sendMail from '../helpers/emails';
import UserServices from '../services/user.service';
import checkPassword from '../middlewares/user.middleware';
import db from '../database/models';

dotenv.config();


/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class userController {

  static async signup(req, res) {
    try {
      const { firstName, lastName, phoneNumber, email,authType, gender, state, country } = req.body;
      const password = EncryptPassword(req.body.password);
      const code = Math.floor(100000 + Math.random() * 900000);
      const existingUser = await UserServices.findExistingUsers(email, phoneNumber);
      if (existingUser) {
        return response.errorMessage(res, 'user already exist', 409);
      }
        const token = GenerateToken({
            email,
            firstName,
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
            token,
          authType,
          state,
          country,
          isVerified: false,
        };
         const verificationEmail = generateEmail(NewUser);
        await sendMail(
          process.env.SENDGRID_API_KEY,
          email,
          process.env.SENDER_EMAIL,
          'Diatron Health',
          verificationEmail
        );

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

        const data = {
            token,
        };
      return response.successMessage(
          res,
          'user created successfully, proceed to verify your account from your email',
          201,
          data
      );
    } catch (e) {
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
            const { phoneNumber, email } = req.body;
            const userToUpdate = await UserServices.findExistingUser(phoneNumber, email);
            if (!userToUpdate) {
                return response.errorMessage(res, 'Account not found', 404);
            }
            if (userToUpdate && userToUpdate.isVerified) {
                return response.errorMessage(res, 'user already activated', 409);
            }
            const { firstName, code } = userToUpdate
            const verificationEmail = generateEmail(userToUpdate);
            await sendMail(
                process.env.SENDGRID_API_KEY,
                email,
                process.env.SENDER_EMAIL,
                'Diatron Health',
                verificationEmail
            );

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
            return response.successMessage(
                res,
                'Account code sent successfully, Please verify your account',
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
}

export default userController;
