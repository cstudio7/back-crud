import express from 'express';
import weightController from '../controllers/weight.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
const router = express.Router();

router.post('/', verifyToken.headerToken, verifyUser, weightController.addWeight);
router.get('/', verifyToken.headerToken, verifyUser, weightController.getWeight);
router.get('/wg/:id', verifyToken.headerToken, verifyUser, weightController.getOneWeight);
router.patch('/', verifyToken.headerToken, verifyUser, weightController.editWeight);
router.delete('/', verifyToken.headerToken, verifyUser, weightController.deleteWeight);
export default router;
