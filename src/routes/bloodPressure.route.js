import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import bloodPressureController from "../controllers/bloodPressure.controller";
const router = express.Router();

router.post('/', verifyToken.headerToken, verifyUser, bloodPressureController.addBloodPressure);
router.get('/', verifyToken.headerToken, verifyUser, bloodPressureController.getAllPressure);
router.get('/pressure/:id', verifyToken.headerToken, verifyUser, bloodPressureController.getOnePressues);
router.patch('/', verifyToken.headerToken, verifyUser, bloodPressureController.editPressure);
router.delete('/', verifyToken.headerToken, verifyUser, bloodPressureController.deleteBlood);
export default router;
