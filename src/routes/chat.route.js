import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import chatController from '../controllers/chat.controller';

const router = express.Router();


router.get('/users', verifyToken.headerToken, chatController.getAllUsers);

export default router;
