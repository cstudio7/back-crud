import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import inspirationController from "../controllers/inspiration.controller";
const router = express.Router();

router.post('/', verifyToken.headerToken, verifyUser, inspirationController.addInspiration);
router.get('/', verifyToken.headerToken, verifyUser, inspirationController.getAllInspiration);
router.get('/insp/:id', verifyToken.headerToken, verifyUser, inspirationController.getInspiration);
router.patch('/', verifyToken.headerToken, verifyUser, inspirationController.editInspiration);
router.delete('/', verifyToken.headerToken, verifyUser, inspirationController.deleteInspiration);
export default router;
