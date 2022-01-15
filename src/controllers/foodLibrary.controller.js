import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class foodLibraryController {


  static async addFoodDetails(req, res) {
    try {
      const { id } = req.user;
      const { details } = req.body;

      const act = { userId: id, details};

      const data = await db.foodLib.create(act);
      return res.status(201).json({
        status: 201,
        message: 'Food Details Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getFoodLibrary(req, res) {
    const { id } = req.user;
    try {
      const data = await db.foodLib.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Food Library', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneFoodLib(req, res) {
    const { id } = req.params;
    try {
      const data = await db.foodLib.findOne({
        where: { id },
      });
      response.successMessage(res, 'Food Library', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUsersFoodLib(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.foodLib.findOne({
        where: { userId },
      });
      response.successMessage(res, 'Food Library', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }



  static async editFoodLib(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const foodToUpdate = await db.foodLib.findOne({ where: { id } });
      const data = await foodToUpdate.update(infoData);
      return response.successMessage(res, 'Food Updated', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async deleteLibrary(req, res) {
    try {
      const { id } = req.body;
      await db.foodLib.destroy({ where: { id } });
      response.successMessage(res, 'Library deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default foodLibraryController;
