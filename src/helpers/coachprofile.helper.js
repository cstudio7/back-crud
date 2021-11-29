import response from './response.helper';
import db from "../database/models";

/**
 * This class contains functions for all user to view and update profile.
 */
class coachProfileHelper {
  /**
   * service to choose profile to edit
   * eslint-disable-next-line valid-jsdoc
   * @param {Object} userData user request
   * @param onBoarding
   * @returns {Object} return user message
   */
  static chooseProfileData(userData, onBoarding) {
    const {
      id,
      firstName,
      lastName, bio, phoneNumber, email,
      avatar,
      gender,
      state, country
    } = userData;

    return {
      id,
      firstName,
      lastName, bio, phoneNumber, email,
      avatar,
      gender,
      state, country
    };
  }

  /**
   * service to choose profile to edit
   * @param {Object} email The request object
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async getProfileData(req, res) {

    const userDetails = await db.coach.findByPk(req.user.id);

    const user = req.user
    const userProfile = this.chooseProfileData(user, userDetails);
    return response.successMessage(res, 'Coach Profile', 200, userProfile);
  }
}
export default coachProfileHelper;
