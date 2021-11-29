import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for bloodPressure related operations
 */
class a1cController {
  /**
   * Add a bloodPressure and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addA1c(req, res) {
    try {
      const { id } = req.user;
      const { type, readingValue, startTime, note } = req.body;
      const Blood = { userId: id, startTime, type, readingValue, note };

      const data = await db.a1c.create(Blood);
      return res.json({
        status: 201,
        message: 'A1c Added',
        data,
      });
    } catch (e) {
      console.log(e)
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getA1c(req, res) {
    const { id } = req.user;
    try {
      const data = await db.a1c.findAll({
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
  static async getOneA1c(req, res) {
    const { id } = req.params;
    try {
      const data = await db.a1c.findOne({
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
  static async editA1c(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const weightToUpdate = await db.a1c.findOne({ where: { id } });
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
  static async deleteA1c(req, res) {
    try {
      const { id } = req.body;
      await db.a1c.destroy({ where: { id } });
      response.successMessage(res, 'Blood Pressure deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default a1cController;
