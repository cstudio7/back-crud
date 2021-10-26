import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class weightController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addWeight(req, res) {
    try {
      const { id } = req.user;
      const { type, readingValue, note, desc } = req.body;
      const Blood = { userId: id, type, readingValue, note, desc };

      const data = await db.weight.create(Blood);
      return res.json({
        status: 201,
        message: 'Weight Details Added',
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
  static async getWeight(req, res) {
    const { id } = req.user;
    try {
      const weight = await db.weight.findAll({
        where: { userId: id },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'Weight', 200, data)
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
  static async getOneWeight(req, res) {
    const { id } = req.params;
    try {
      const weight = await db.weight.findOne({
        where: { id },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'Weight', 200, data);
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
  static async editWeight(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const weightToUpdate = await db.weight.findOne({ where: { id } });
      const weight = await weightToUpdate.update(infoData);
      const data = {
        weight,
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
  static async deleteWeight(req, res) {
    try {
      const { id } = req.body;
      await db.weight.destroy({ where: { id } });
      response.successMessage(res, 'Weight deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default weightController;
