import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class foodController {


  static async addFood(req, res) {
    try {
      const { id } = req.user;
      const { name,
        addRecipe,avatar, startTime,
        avatarAwsDetails,note } = req.body;
      const Food = { userId: id, name,
        addRecipe,avatar, startTime,
        avatarAwsDetails,note  };

      const data = await db.fud.create(Food);
      return res.json({
        status: 201,
        message: 'Food Details Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getFood(req, res) {
    const { id } = req.user;
    try {
      const data = await db.fud.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Food Details', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneFood(req, res) {
    const { id } = req.params;
    try {
      const data = await db.fud.findOne({
        where: { id },
      });
      response.successMessage(res, 'Food Details', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUsersFood(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.fud.findAll({
        where: { userId },
      });
      response.successMessage(res, 'Food Details', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async editFood(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const foodToUpdate = await db.fud.findOne({ where: { id } });
      const data = await foodToUpdate.update(infoData);
      return response.successMessage(res, 'Food Details Updated.', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async deleteFood(req, res) {
    try {
      const { id } = req.body;
      await db.fud.destroy({ where: { id } });
      response.successMessage(res, 'Food deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default foodController;
