import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class activityController {


  static async addActivity(req, res) {
    try {
      const { id } = req.user;
      const { activity, difficulty, type, avatar, startTime,
        avatarAwsDetails, note
      } = req.body;

      const act = { userId: id, activity, difficulty, type, avatar, startTime,
        avatarAwsDetails, note };

      const data = await db.activity.create(act);
      return res.status(201).json({
        status: 201,
        message: 'New Activity Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getActivity(req, res) {
    const { id } = req.user;
    try {
      const data = await db.activity.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Activity', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneActivity(req, res) {
    const { id } = req.params;
    try {
      const data = await db.activity.findOne({
        where: { id },
      });
      response.successMessage(res, 'All Activities', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUsersActivity(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.activity.findOne({
        where: { userId },
      });
      response.successMessage(res, 'All Activities', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async editActivity(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const goalToUpdate = await db.activity.findOne({ where: { id } });
      const data = await goalToUpdate.update(infoData);
      return response.successMessage(res, 'Activity Updated', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async deleteActivity(req, res) {
    try {
      const { id } = req.body;
      await db.activity.destroy({ where: { id } });
      response.successMessage(res, 'Activity deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default activityController;
