import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import EncryptPassword from '../helpers/Encryptor';
import GenerateToken from '../helpers/token.helper';
import generateEmail from '../emailTemplates/verification';
import sendMail from '../helpers/emails';
import UserServices from '../services/user.service';
import checkPassword from '../middlewares/users.middleware';
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
      const existingUser = await UserServices.findExistingUser(email, phoneNumber);
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
        const message = `Hi ${firstName}, Welcome to Diatron Health, Your Verification code is ${code}!`

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
}

export default coachController;
