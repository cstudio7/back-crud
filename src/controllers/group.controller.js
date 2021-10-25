import Sequelize, { Op } from 'sequelize';
import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class groupController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addToGroup(req, res) {

    const mapEntityToModel = (entity) => {
      switch (entity) {
        case 'nutrition':
          return db.nutrition;
          break;
        case 'weightMgt':
          return db.weightMgt;
          break;
        case 'hypertensionMgt':
          return db.hypertensionMgt;
          break;
        case 'stressMgt':
          return db.stressMgt;
          break;
        case 'workHome':
          return db.workHome;
          break;
        case 'workout':
          return db.workout;
          break;
        case 'homeAged':
          return db.homeAged;
          break;
        case 'homeKid':
          return db.homeKid;
          break;
        case 'sleepHealth':
          return db.sleepHealth;
          break;
        default:
          break;
      }
    };

    try {
      const userId = req.body.senderId;
      const existingUser = await mapEntityToModel(req.query.modal).findOne({
        where: { userId },
      });
      if (existingUser) {
        const data = {
          status: 409,
          message: 'User Already Exist',
          data: existingUser,
        };
        return data;
      }
      const newContact = {
        userId,
      };
      const contact = await mapEntityToModel(req.query.modal).create(newContact);
      let name = 'A new user'
      const data = {
        status: 201,
        message: `${name} just Joined`,
        data: contact,
      };
      return data;
    } catch (e) {
      const data = {
        status: 400,
        message: 'Error Adding User',
      };
      return data;
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async removeUser(req, res) {
    try {
      const mapEntityToModel = (entity) => {
        switch (entity) {
          case 'nutrition':
            return db.nutrition;
            break;
          case 'weightMgt':
            return db.weightMgt;
            break;
          case 'hypertensionMgt':
            return db.hypertensionMgt;
            break;
          case 'stressMgt':
            return db.stressMgt;
            break;
          case 'workHome':
            return db.workHome;
            break;
          case 'workout':
            return db.workout;
          case 'homeAged':
            return db.homeAged;
            break;
          case 'homeKid':
            return db.homeKid;
            break;
          case 'sleepHealth':
            return db.sleepHealth;
            break;
          default:
            break;
        }
      };
      const { id } = req.query;
      await mapEntityToModel(req.query.modal).destroy({ where: { id } });
      response.successMessage(res, 'user removed successfully', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 404);
    }
  }



}

export default groupController;
