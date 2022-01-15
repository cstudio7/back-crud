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
        case 'workingHome':
          return db.workingHome;
          break;
        case 'workout':
          return db.workout;
          break;
        case 'homeAged':
          return db.homeAged;
          break;
        case 'homeKidMgt':
          return db.homeKidMgt;
          break;
        case 'sleepHealthMgt':
          return db.sleepHealthMgt;
          break;
        case 'excerciseMgt':
          return db.excerciseMgt;
          break;
        default:
          break;
      }
    };

    try {

      const senderId = req.id;
      const fullName = req.fullName;
      let user

      user = await db.user.findByPk(senderId,{attributes: ['id','group']});

      let group
      if(user.group === null){
        group = []
      } else {
        group = user.group
      }
      console.log(group)
      if(req.modal2 !== "coach"){

        // if(group.length > 1 ){
        //   console.log('no')
        //   return {
        //     status: 409,
        //     message: 'User Already Exist',
        //   }
        // }
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
        fullName,
        message: `${req.fullName} just Joined`,
      };
      await mapEntityToModel(req.modal).create(newContact);
      let data
      if( group.length === 0){

        await user.update({
          group: [
            `${req.modal}`
          ]
        });
      } else {
        await user.update({
          group: [
            ...group,
            req.modal
          ]
        });
      }
      return {
        status: 201,
        message: `${req.fullName} just Joined`,
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
          case 'workingHome':
            return db.workingHome;
            break;
          case 'workout':
            return db.workout;
            break;
          case 'homeAged':
            return db.homeAged;
            break;
          case 'homeKidMgt':
            return db.homeKidMgt;
            break;
          case 'sleepHealthMgt':
            return db.sleepHealthMgt;
            break;
          case 'excerciseMgt':
            return db.excerciseMgt;
            break;
          default:
            break;
        }
      };

      const senderId = req.id;
      const user = await db.user.findByPk(senderId,{attributes: ['id','group']});
      let newGroup = group.filter( elem => elem !== req.modal )

      let count = {
        group: newGroup
      };
      await user.update(count);
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
          case 'workingHome':
            return db.workingHome;
            break;
          case 'workout':
            return db.workout;
            break;
          case 'homeAged':
            return db.homeAged;
            break;
          case 'homeKidMgt':
            return db.homeKidMgt;
            break;
          case 'sleepHealthMgt':
            return db.sleepHealthMgt;
            break;
          case 'excerciseMgt':
            return db.excerciseMgt;
            break;
          default:
            break;
        }
      };

      if(req.modal === "chat"){
        const {senderId, receiverId } = req

        return await db.chat.findAndCountAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [{senderId}, {receiverId}],
              },
              {
                [Op.and]: [{senderId: receiverId}, {receiverId: senderId}],
              },
            ],
          },
          order: [['createdAt', 'DESC']],
        });
      }

      return await mapEntityToModel(req.modal).findAll({
        where: {
          createdAt: {
            [Op.gte]: moment().subtract(7, 'days').toDate()
          }
        }
      });
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
          case 'workingHome':
            return db.workingHome;
            break;
          case 'workout':
            return db.workout;
            break;
          case 'homeAged':
            return db.homeAged;
            break;
          case 'homeKidMgt':
            return db.homeKidMgt;
            break;
          case 'sleepHealthMgt':
            return db.sleepHealthMgt;
            break;
          case 'excerciseMgt':
            return db.excerciseMgt;
            break;
          default:
            break;
        }
      };

      if(req.modal === "chat"){
        let save = {
          senderId: req.senderId,
          receiverId: req.receiverId,
          message: req.message
        }
        return await db.chat.create(save);
      }
      const senderId = req.senderId;
      const existingUser = await mapEntityToModel(req.modal).findOne({
        where: { senderId },
      });
      if (!existingUser) {
        return {
          status: 409,
          message: 'You are not permitted to make this request',
        };
      }
      let save = {
        senderId: req.senderId,
        fullName: req.fullName,
        message: req.message
      }

      return await mapEntityToModel(req.modal).create(save);
    } catch (e) {
      console.log(e)
    }
  }
}

export default groupController;
