import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class medicationController {
  /**
   * Add a food and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addMedication(req, res) {
    try {
      const { id } = req.user;
      const { type, amount,avatar,
        avatarAwsDetails, measuringUnit } = req.body;
      const med = { userId: id, type, amount,avatar,
        avatarAwsDetails, measuringUnit  };

      const data = await db.medication.create(med);
      return res.status(status).json({
        status: 201,
        message: 'Medications Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getMedication(req, res) {
    const { id } = req.user;
    try {
      const data = await db.medication.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Medication Details', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }



  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getOneMed(req, res) {
    const { id } = req.params;
    try {
      const data = await db.medication.findOne({
        where: { id },
      });
      response.successMessage(res, 'Medication Details', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async editMedication(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const medToUpdate = await db.Medication.findOne({ where: { id } });
      const data = await medToUpdate.update(infoData);
      return response.successMessage(res, 'Medication Details Updated.', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {object} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async deleteMedication(req, res) {
    try {
      const { id } = req.body;
      await db.medication.destroy({ where: { id } });
      response.successMessage(res, 'Medication deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default medicationController;
