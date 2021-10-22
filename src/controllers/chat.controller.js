/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import Sequelize, { Op } from 'sequelize';
import { clients } from '../helpers/socket.helper';
import chatService from '../services/chat.service';
import response from '../helpers/response.helper';
import db from '../database/models';

dotenv.config();

/** Function to list all users
 * @returns {*} data returned
 */
class ChatController {
  /** Function to list all users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async getAllUsers(req, res) {
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

      const { userId } = req.query.id;
      const allContacts =   await mapEntityToModel(req.query.modal).findAll({
        where: { senderId:userId },
        include: [
          {
            model: db.user,
            as: userDetails,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'avatar',
              'email',
              'createdAt',
            ],
          },
        ],
      });

      const privateContacts =  await db.chat.findAll({
        where: {
          [Op.or]: [
            {
              senderId: userId,
            },
            {
              receiverId: userId,
            },
          ],
        },
        include: [
          {
            model: db.user,
            as: chatContactUserAs,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'avatar',
              'email',
              'createdAt',
            ],
          },
        ],
      });

      const newArray = [];
      allContacts.forEach((contact) => {
        const client = clients[contact[userId]];
        newArray.push({
          id: contact.id,
          userId: contact.userId,
          artisanId: contact.artisanId,
          createdAt: contact.createdAt,
          user: contact[userId].dataValues,
          isOnline: Boolean(client),
        });
      });


      privateContacts.forEach((contact) => {
        const client = clients[contact[userId]];
        newArray.push({
          id: contact.id,
          userId: contact.userId,
          artisanId: contact.artisanId,
          createdAt: contact.createdAt,
          user: contact[userId].dataValues,
          isOnline: Boolean(client),
        });
      });

      return response.successMessage(
        res,
        'users available',
        200,
          newArray
          .sort((a, b) => a.isOnline.toString().localeCompare(b.isOnline.toString()))
          .reverse()
      );
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  /** Get Private and public message between two users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async getMessages(req, res) {
    try {
      const { userId, page, size } = req.query;
      const { id } = req.user;
      if (userId) {
        const publicMessages = await chatService.getGroupMessage();
        return response.successMessage(res, 'Messages', 200, publicMessages);
      }
      const privateMessages = await chatService.getPrivateMessage(userId, id, page, size);
      return response.successMessage(res, 'Messages', 200, privateMessages);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default ChatController;
