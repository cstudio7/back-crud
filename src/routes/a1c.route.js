import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import InputValidation from '../helpers/Validations/bloodPressure.joi.validate';
import verifyUser from '../middlewares/verify.user.middleware';
import a1cController from "../controllers/a1c.controller";
import verifyTokens from "../middlewares/coachToken/verify.coach.middleware";
const router = express.Router();

const {
    validateBloodPressure
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateBloodPressure, a1cController.addA1c);
router.get('/', verifyToken.headerToken, verifyUser, a1cController.getA1c);
router.get('/:id', verifyToken.headerToken, verifyUser, a1cController.getOneA1c);
router.get('/user/:userId', verifyTokens.verifyCoachToken, a1cController.getOneUserA1c);
router.patch('/:id', verifyToken.headerToken, verifyUser, a1cController.editA1c);
router.delete('/', verifyToken.headerToken, verifyUser, a1cController.deleteA1c);
export default router;
