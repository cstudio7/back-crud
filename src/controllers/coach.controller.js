import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import EncryptPassword from '../helpers/Encryptor';
import GenerateToken from '../helpers/token.helper';
import generateEmail from '../emailTemplates/verificationCoach';
import sendMail from '../helpers/emails';
import UserServices from '../services/user.service';
import checkPassword from '../middlewares/users.middleware';
import coachProfileHelper from "../helpers/coachprofile.helper";
import db from '../database/models';

dotenv.config();

/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class coachController {

  static async CoachSignup(req, res) {
    try {
        const { firstName, lastName, phoneNumber, email,authType, gender, state, country } = req.body;
      const password = EncryptPassword(req.body.password);
      const code = Math.floor(100000 + Math.random() * 900000);
      const existingUser = await UserServices.findExistingCoach(email, phoneNumber);
      if (existingUser) {
        return response.errorMessage(res, 'user already exist', 409);
      }
        const token = GenerateToken({
          email,
          firstName,
          lastName,
          authType,
          isVerified: false,
        });
        const NewUser = {
          firstName,
          lastName,
          phoneNumber,
          email,
          code,
          gender,
          password,
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
        const data = {
          token,
        };
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const message = `Hi ${firstName}, Welcome to Diatron Health,We are Glad to have you on our Platform! Your Verification code is ${code}!`

        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+${phoneNumber}`
            })
            .then(message => console.log("Phone Message Delivered"));

      await db.coach.create(NewUser);
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
   * Logs in a user by checking if they exist in the database
   * and if the supplied password matches the stored password
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async getAllCoach(req, res) {
    try {
      const coach = await db.coach.findAll();
      const data = {
        coach
      };

      return response.successMessage(
          res,
          'All Coaches',
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
  static async getCoach(req, res) {
    return coachProfileHelper.getProfileData(req, res);
  }


  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */

  static async editCoachProfile(req, res) {
    try {
      const user = req.user;
      const userInfo = req.body;
      const user2 = await user.update(userInfo);

      // Check if user is verified
      if (user.isVerified === false) {
        const status = 401;
        return response.errorMessage(res, 'User Is Not Verified, Please verify the User First', status);
      }

      const profile = coachProfileHelper.chooseProfileData(user2);
      return response.successMessage(
          res,
          'User Profile are Updated',
          200,
          profile
      );
    } catch (e) {
      console.log(e)
      return response.errorMessage(res, e.message, 400);
    }
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
      const updateUser = await UserServices.activeCoach(phoneNumber, code, activate);
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

}

export default coachController;
