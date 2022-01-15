import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class medLibraryController {

  static async addMedDetails(req, res) {
    try {
      const { id } = req.user;
      const { details } = req.body;

      const act = { userId: id, details};

      const data = await db.medLib.create(act);
      return res.status(201).json({
        status: 201,
        message: 'Medication Details Added',
        data,
      });
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getMedLibrary(req, res) {
    const { id } = req.user;
    try {
      const data = await db.medLib.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Med Library', 200, data)
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async getOneMedLib(req, res) {
    const { id } = req.params;
    try {
      const data = await db.medLib.findOne({
        where: { id },
      });
      response.successMessage(res, 'Med Library', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async getOneUserMedLib(req, res) {
    const { userId } = req.params;
    try {
      const data = await db.medLib.findOne({
        where: { userId },
      });
      response.successMessage(res, 'Med Library', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  static async editMedLibrary(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const medToUpdate = await db.medLib.findOne({ where: { id } });
      const data = await medToUpdate.update(infoData);
      return response.successMessage(res, 'Food Updated', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  static async deleteLibrary(req, res) {
    try {
      const { id } = req.body;
      await db.medLib.destroy({ where: { id } });
      response.successMessage(res, 'Library deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default medLibraryController;
