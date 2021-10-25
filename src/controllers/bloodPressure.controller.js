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
      const { type, readingValue, time, desc } = req.body;
      const Blood = { userId: id, type, readingValue, time, desc };

      const data = await db.bloodPressure.create(Blood);
      return res.status(status).json({
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
      const blood = await db.bloodPressure.findAll({
        where: { userId: id },
      });
      const data = {
        blood,
      };
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
      const blood = await db.bloodPressure.findOne({
        where: { id },
      });
      const data = {
        blood,
      };
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
  static async getAllPressure(req, res) {
    const { userId } = req.query;
    try {
      const blood = await db.blooodPressure.findAll({
        where: { userId },
      });
      const data = {
        blood,
      };
      response.successMessage(res, 'All Blood Pressure Records', 200, data);
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
      const weightToUpdate = await db.bloodPressure.findOne({ where: { id } });
      const pressure = await weightToUpdate.update(infoData);
      const data = {
        pressure,
      };
      return response.successMessage(res, 'Gallery Updated Successfully.', 200, data);
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
      await db.bloodPressure.destroy({ where: { id } });
      response.successMessage(res, 'Blood Pressure deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default bloodPressureController;
