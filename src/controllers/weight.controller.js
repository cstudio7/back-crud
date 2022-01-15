import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class weightController {

  static async addWeight(req, res) {
    try {
      const { id } = req.user;
      const { type, readingValue, startTime, note, desc } = req.body;
      const Blood = { userId: id, type, readingValue, startTime, note, desc };

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


  static async getWeight(req, res) {
    const { id } = req.user;
    try {
      const weight = await db.weight.findAll({
        where: { userId: id },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'Weight Details', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneWeight(req, res) {
    const { id } = req.params;
    try {
      const weight = await db.weight.findOne({
        where: { id },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'Weight Detail', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUserWeight(req, res) {
    const { userId } = req.params;
    try {
      const weight = await db.weight.findOne({
        where: { userId },
      });
      const data = {
        weight,
      };
      response.successMessage(res, 'Weight Detail', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async editWeight(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const weightToUpdate = await db.weight.findOne({ where: { id } });
      const weight = await weightToUpdate.update(infoData);
      const data = {
        weight,
      };
      return response.successMessage(res, 'Weight Record Updated', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async deleteWeight(req, res) {
    try {
      const { id } = req.body;
      await db.weight.destroy({ where: { id } });
      response.successMessage(res, 'Weight Record Deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default weightController;
