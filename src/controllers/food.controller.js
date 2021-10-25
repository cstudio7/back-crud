import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class foodController {
  /**
   * Add a food and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addFood(req, res) {
    try {
      const { id } = req.user;
      const { name,
        addRecipe,desc,avatar,
        avatarAwsDetails,date,time,addToLibrary } = req.body;
      const Food = { userId: id, name,
        addRecipe,desc,avatar,
        avatarAwsDetails,date,
        time,addToLibrary  };

      const data = await db.food.create(Food);
      return res.status(status).json({
        status: 201,
        message: 'Food Details Added',
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
  static async getOneFood(req, res) {
    const { id } = req.user;
    try {
      const food = await db.food.findAll({
        where: { userId: id },
      });
      const data = {
        food,
      };
      response.successMessage(res, 'Food', 200, data)
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
  static async getOneFood(req, res) {
    const { id } = req.params;
    try {
      const weight = await db.food.findOne({
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
  static async getOnePressure(req, res) {
    const { id } = req.params;
    try {
      const photo = await db.media.findOne({
        where: { id },
      });
      const data = {
        photo,
      };
      response.successMessage(res, 'Gallery photo', 200, data);
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
  static async editFood(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const weightToUpdate = await db.food.findOne({ where: { id } });
      const weight = await weightToUpdate.update(infoData);
      const data = {
        weight,
      };
      return response.successMessage(res, 'Food Details Updated.', 200, data);
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
      await db.food.destroy({ where: { id } });
      response.successMessage(res, 'Weight deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default weightController;
