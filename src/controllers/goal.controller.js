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
  static async addGoal(req, res) {
    try {
      const { id } = req.user;
      const { title, interval, goal, desc,
        notification, goalDay, notificationDelay,
        startDate, startTime, streak
      } = req.body;

      const goals = { userId: id, title, interval, goal, desc,
        notification, goalDay, notificationDelay,
        startDate, startTime, streak };

      const data = await db.weight.create(goals);
      return res.status(status).json({
        status: 201,
        message: 'New Goals Added',
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
  static async getOneGoal(req, res) {
    const { id } = req.user;
    try {
      const goal = await db.goal.findAll({
        where: { userId: id },
      });
      const data = { goal };
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
  static async getAllGoal(req, res) {
    const { userId } = req.query;
    try {
      const weight = await db.weight.findAll({
        where: { userId },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'All Goals', 200, data);
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
  static async getOneGoal(req, res) {
    const { id } = req.params;
    try {
      const goal = await db.goal.findOne({
        where: { id },
      });
      const data = { goal };
      response.successMessage(res, 'Goal', 200, data);
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
  static async editGoal(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const weightToUpdate = await db.goal.findOne({ where: { id } });
      const goal = await weightToUpdate.update(infoData);
      const data = {
        goal
      };
      return response.successMessage(res, 'Goal Updated', 200, data);
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
  static async deleteGoal(req, res) {
    try {
      const { id } = req.body;
      await db.goal.destroy({ where: { id } });
      response.successMessage(res, 'Goals deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default weightController;
