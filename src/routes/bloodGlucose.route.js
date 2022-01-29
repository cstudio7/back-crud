import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyTokens from "../middlewares/coachToken/verify.coach.middleware";
import InputValidation from '../helpers/Validations/bloodGlucose.joi.validate';
import verifyUser from '../middlewares/verify.user.middleware';
import bloodGlucoseController from "../controllers/bloodGlucose.controller";
const router = express.Router();

const {
    validateGlucosePressure
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateGlucosePressure, bloodGlucoseController.addBloodGlucose);
router.get('/', verifyToken.headerToken, verifyUser, bloodGlucoseController.getGlucose);
router.get('/:id', verifyToken.headerToken, verifyUser, bloodGlucoseController.getOneGlucose);
router.get('/user/:userId', verifyTokens.verifyCoachToken, bloodGlucoseController.getOneUsersGlucose);
router.patch('/:id', verifyToken.headerToken, verifyUser, bloodGlucoseController.editGlucose);
router.delete('/', verifyToken.headerToken, verifyUser, bloodGlucoseController.deleteBlood);
export default router;
