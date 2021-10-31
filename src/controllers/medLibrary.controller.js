import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class medLibraryController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addMedDetails(req, res) {
    try {
      const { id } = req.user;
      const { details } = req.body;

      const act = { userId: id, details};

      const data = await db.medLibrary.create(act);
      return res.status(status).json({
        status: 201,
        message: 'Medication Details Added',
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
  static async getMedLibrary(req, res) {
    const { id } = req.user;
    try {
      const data = await db.medLibrary.findAll({
        where: { userId: id },
      });
      response.successMessage(res, 'Med Library', 200, data)
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
  static async getOneMedLib(req, res) {
    const { id } = req.params;
    try {
      const data = await db.medLibrary.findOne({
        where: { id },
      });
      response.successMessage(res, 'Med Library', 200, data);
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
  static async editMedLibrary(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const medToUpdate = await db.medLibrary.findOne({ where: { id } });
      const data = await medToUpdate.update(infoData);
      return response.successMessage(res, 'Food Updated', 200, data);
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
  static async deleteLibrary(req, res) {
    try {
      const { id } = req.body;
      await db.medLibrary.destroy({ where: { id } });
      response.successMessage(res, 'Library deleted', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default medLibraryController;
