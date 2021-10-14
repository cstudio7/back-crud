import response from './response.helper';

/**
 * This class contains functions for all user to view and update profile.
 */
class ProfileHelper {
  /**
 * service to choose profile to edit
 * eslint-disable-next-line valid-jsdoc
 * @param {Object} email user request
 * @param {Object} userData user request
 * @returns {Object} return user message
 */
  static chooseProfileData(userData) {
    const {
      id,
      firstName,
      lastName, phoneNumber, email,
      avatar, gender,
      personalDetails, hypertensionProfile,
      diabetesProfile, lifestyleProfile,
      state, country
    } = userData;
    return {
      id, firstName, email,
      avatar, gender,
      lastName, phoneNumber,
      personalDetails, hypertensionProfile,
      diabetesProfile, lifestyleProfile,
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
    const user = req.user
    const userProfile = this.chooseProfileData(user);
    return response.successMessage(res, 'User Profile', 200, userProfile);
  }
}
export default ProfileHelper;
