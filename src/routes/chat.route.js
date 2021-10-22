import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import chatController from '../controllers/chat.controller';
import groupController from '../controllers/contact.controller';

const router = express.Router();

router.post('/chat', verifyToken.headerToken, groupController.addGroup);
router.delete('/chat', verifyToken.headerToken, groupController.removeUser);
router.get('/chat', verifyToken.headerToken, chatController.getAllUsers);
router.get('/', verifyToken.headerToken, chatController.getMessages);

export default router;
