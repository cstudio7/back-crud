import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class goalController {


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

      const data = await db.goal.create(goals);
      return res.json({
        status: 201,
        message: 'New Goals Added',
        data,
      });
    } catch (e) {
      console.log(e)
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getGoal(req, res) {
    const { id } = req.user;
    try {
      const goal = await db.goal.findAll({
        where: { userId: id },
      });
      const data = { goal };
      response.successMessage(res, 'Goals', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneGoal(req, res) {
    const { id } = req.params;
    try {
      const data = await db.goal.findOne({
        where: { id },
      });
      response.successMessage(res, 'All Goals', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUsersGoal(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.goal.findOne({
        where: { userId },
      });
      response.successMessage(res, 'All Goals', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getStatusGoal(req, res) {
    const { status } = req.params;
    try {
      const goal = await db.goal.findAll({
        where: { status },
      });
      const data = { goal };
      response.successMessage(res, 'Goals', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async editGoal(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const goalToUpdate = await db.goal.findOne({ where: { id } });
      const data = await goalToUpdate.update(infoData);
      return response.successMessage(res, 'Goal Updated', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


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

export default goalController;
