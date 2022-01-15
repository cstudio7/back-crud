import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for bloodPressure related operations
 */
class bloodGlucoseController {

  static async addBloodGlucose(req, res) {
    try {
      const { id } = req.user;
      const { type, readingValue, readingType, startTime, note } = req.body;
      const Blood = { userId: id, type, readingValue, startTime, readingType, note };

      const data = await db.glucose.create(Blood);
      return res.json({
        status: 201,
        message: 'Blood Glucose Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getGlucose(req, res) {
    const { id } = req.user;
    try {
      const data = await db.glucose.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Blood Glucose', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneGlucose(req, res) {
    const { id } = req.params;
    try {
      const data = await db.glucose.findOne({
        where: { id },
      });
      response.successMessage(res, 'Blood Glucose', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneUsersGlucose(req, res) {
    const userId = req.params.userId;
    try {
      const data = await db.glucose.findOne({
        where: { userId },
      });
      response.successMessage(res, 'Blood Glucose', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async editGlucose(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const glucoseToUpdate = await db.glucose.findOne({ where: { id } });
      const data = await glucoseToUpdate.update(infoData);
      return response.successMessage(res, 'Updated Successfully.', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async deleteBlood(req, res) {
    try {
      const { id } = req.body;
      await db.glucose.destroy({ where: { id } });
      response.successMessage(res, 'Blood Glucose deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default bloodGlucoseController ;
