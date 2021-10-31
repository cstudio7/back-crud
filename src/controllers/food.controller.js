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
        addRecipe,avatar,
        avatarAwsDetails,note } = req.body;
      const Food = { userId: id, name,
        addRecipe,avatar,
        avatarAwsDetails,note  };

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
  static async getFood(req, res) {
    const { id } = req.user;
    try {
      const data = await db.food.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Food Details', 200, data)
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
      const data = await db.food.findOne({
        where: { id },
      });
      response.successMessage(res, 'Food Details', 200, data);
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
      const foodToUpdate = await db.food.findOne({ where: { id } });
      const data = await foodToUpdate.update(infoData);
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
      response.successMessage(res, 'Food deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default foodController;
