import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class medicationController {


  static async addMedication(req, res) {
    try {
      const { id } = req.user;
      const { type, amount,avatar, startTime,
        avatarAwsDetails, measuringUnit } = req.body;
      const med = { userId: id, type, amount,avatar, startTime,
        avatarAwsDetails, measuringUnit
      };

      const data = await db.medication.create(med);
      return res.status(201).json({
        status: 201,
        message: 'Medications Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getMedication(req, res) {
    const { id } = req.user;
    try {
      const data = await db.medication.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Medication Details', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneMed(req, res) {
    const { id } = req.params;
    try {
      const data = await db.medication.findOne({
        where: { id },
      });
      response.successMessage(res, 'Medication Details', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUsersMed(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.medication.findOne({
        where: { userId },
      });
      response.successMessage(res, 'Medication Details', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async editMedication(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const medToUpdate = await db.medication.findOne({ where: { id } });
      const data = await medToUpdate.update(infoData);
      return response.successMessage(res, 'Medication Details Updated.', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async deleteMedication(req, res) {
    try {
      const { id } = req.body;
      await db.medication.destroy({ where: { id } });
      response.successMessage(res, 'Medication deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default medicationController;
