import moment from "moment";
import {Op} from 'sequelize';
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
        case 'nutritionMgt':
          return db.nutritionMgt;
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
      const senderId = req.id;
      const user = await db.user.findByPk(senderId);

      if(user.group > 1){
        return {
          status: 409,
          message: 'User Already Exist',
        }
      }
      const existingUser = await mapEntityToModel(req.modal).findOne({
        where: { senderId },
      });
      if (existingUser) {
        return {
          status: 409,
          message: 'User Already Exist',
        };
      }
      const newContact = {
        senderId,
        message: `${req.firstName} just Joined`,
      };
      await mapEntityToModel(req.modal).create(newContact);
      let data = {
        group: user.group + 1
      }
      await user.update(data);
      return {
        status: 201,
        message: `${req.firstName} just Joined`,
      };
    } catch (e) {
      console.log(e)
      return {
        status: 400,
        message: 'Error Adding User',
      };
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
          case 'nutritionMgt':
            return db.nutritionMgt;
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
      const senderId = req.id;
      await mapEntityToModel(req.modal).destroy({ where: { senderId } });
      const data = {
        status: 204,
        message: `user removed`,
      };
      return data;
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getMessage(req, res) {
    try {
      const mapEntityToModel = (entity) => {
        switch (entity) {
          case 'nutritionMgt':
            return db.nutritionMgt;
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

     const data =  await mapEntityToModel(req.modal).findAll({ where: {
          createdAt: {
            [Op.gte]: moment().subtract(7, 'days').toDate()
          }
      } });
      return data;
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async saveMessage(req, res) {
    try {
      const mapEntityToModel = (entity) => {
        switch (entity) {
          case 'nutritionMgt':
            return db.nutritionMgt;
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
      let save = {
        senderId: req.id,
        message: req.message
      }

      return await mapEntityToModel(req.modal).create(save);
    } catch (e) {
      console.log(e)
    }
  }
}

export default groupController;
