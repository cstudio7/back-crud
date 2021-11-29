import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for bloodPressure related operations
 */
class bloodPressureController {
  /**
   * Add a bloodPressure and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addBloodPressure(req, res) {
    try {
      const { id } = req.user;
      const { type, readingValue,startTime, note, bpm } = req.body;
      const Blood = { userId: id, type,startTime, readingValue, note, bpm };

      const data = await db.blood.create(Blood);
      return res.json({
        status: 201,
        message: 'Blood Pressure Added',
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
  static async getPressues(req, res) {
    const { id } = req.user;
    try {
      const data = await db.blood.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Blood Pressure', 200, data);
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
  static async getOnePressues(req, res) {
    const { id } = req.params;
    try {
      const data = await db.blood.findOne({
        where: { id },
      });
      response.successMessage(res, 'Blood Pressure', 200, data);
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
  static async editPressure(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const pressureToUpdate = await db.blood.findOne({ where: { id } });
      const data = await pressureToUpdate.update(infoData);
      return response.successMessage(res, 'Updated Successfully.', 200, data);
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
  static async deleteBlood(req, res) {
    try {
      const { id } = req.body;
      await db.blood.destroy({ where: { id } });
      response.successMessage(res, 'Blood Pressure deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default bloodPressureController;
