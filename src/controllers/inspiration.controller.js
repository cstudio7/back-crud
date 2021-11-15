import response from '../helpers/response.helper';
import db from '../database/models';
import shuffle from '../helpers/shuffle'

/**
 * Class for users related operations such Inspiration
 */
class inspirationController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addInspiration(req, res) {
    try {
      await db.inspiration.create(req.body);
      response.successMessage(res, 'Inspiration added successfully', 201);
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
  static async getInspiration(req, res) {
    try {
      const { condition } = req.query;
      const datas = await db.inspiration.findAll({
        where: { condition },
      });
      const data = shuffle(datas);
      response.successMessage(res, 'Inspirations', 200, data);
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
  static async getAllInspiration(req, res) {
    try {
      const datas = await db.inspiration.findAll();
      const data = {
        datas
      };
      response.successMessage(res, 'Gallery photos', 200, data);
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
  static async editInspiration(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const inspToUpdate = await db.inspiration.findOne({ where: { id } });
      const data = await inspToUpdate.update(infoData);
      return response.successMessage(res, 'Gallery Updated Successfully.', 200, data);
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
  static async deleteInspiration(req, res) {
    try {
      const { id } = req.body;
      await db.inspiration.destroy({ where: { id } });
      response.successMessage(res, 'Inspiration deleted successfully', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 404);
    }
  }
}

export default inspirationController;
