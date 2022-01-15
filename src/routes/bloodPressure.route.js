import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import InputValidation from '../helpers/Validations/bloodPressure.joi.validate';
import verifyUser from '../middlewares/verify.user.middleware';
import bloodPressureController from "../controllers/bloodPressure.controller";
const router = express.Router();

const {
    validateBloodPressure
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateBloodPressure, bloodPressureController.addBloodPressure);
router.get('/', verifyToken.headerToken, verifyUser, bloodPressureController.getPressues);
router.get('/:id', verifyToken.headerToken, verifyUser, bloodPressureController.getOnePressues);
router.get('/user/:userId', verifyToken.headerToken, verifyUser, bloodPressureController.getOneUsersPressues);
router.patch('/:id', verifyToken.headerToken, verifyUser, bloodPressureController.editPressure);
router.delete('/', verifyToken.headerToken, verifyUser, bloodPressureController.deleteBlood);
export default router;
