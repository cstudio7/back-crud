import response from './response.helper';
import db from "../database/models";

/**
 * This class contains functions for all user to view and update profile.
 */
class ProfileHelper {
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
      lastName, phoneNumber, email,
      avatar, emergencyContact,
      manage, typeOfDiabetes,
      typeOfHypertension, a1c,
      bloodPressure,
      bloodPressureMin,
      bloodPressureMax,
      bloodGlucose,
      bloodGlucoseMin,
      bloodGlucoseMax, group,
      weight,
      height,
      diagnosedDate,
      gender, dob, race,
      state, country
    } = userData;

    return {
      id,
      firstName,
      lastName, phoneNumber, email,
      avatar, emergencyContact,
      manage, typeOfDiabetes,
      typeOfHypertension, a1c,
      bloodPressure,
      bloodPressureMin,
      bloodPressureMax,
      bloodGlucose,
      bloodGlucoseMin,
      bloodGlucoseMax, group,
      weight,
      height,
      diagnosedDate,
      gender, dob, race,
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
    const userProfile = this.chooseProfileData(user, req.user);
    return response.successMessage(res, 'User Profile', 200, userProfile);
  }
}
export default ProfileHelper;
