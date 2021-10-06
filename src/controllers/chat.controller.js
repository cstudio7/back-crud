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
      const { id: userId, category: userCategory } = req.user;

      let chatContactUserAs = 'artisan';
      let chatContactUserId = 'artisanId';
      if (userCategory !== 'fashionista') {
        chatContactUserAs = 'user';
        chatContactUserId = 'userId';
      }

      const allContacts = await db.contact.findAll({
        where: {
          [Op.or]: [
            {
              userId,
            },
            {
              artisanId: userId,
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
              'otherName',
              'category',
              'email',
              'phoneNumber',
              'createdAt',
            ],
          },
        ],
      });

      const newArray = [];
      allContacts.forEach((contact) => {
        const client = clients[contact[chatContactUserId]];
        newArray.push({
          id: contact.id,
          userId: contact.userId,
          artisanId: contact.artisanId,
          createdAt: contact.createdAt,
          user: contact[chatContactUserAs].dataValues,
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
      if (!userId) {
        const publicMessages = await chatService.getPublicMessage();
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
