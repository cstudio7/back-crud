import express from 'express';
import weightController from '../controllers/weight.controller';
import InputValidation from '../helpers/Validations/weight.joi.validate';
import verifyTokens from "../middlewares/coachToken/verify.coach.middleware";
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
const router = express.Router();

const {
    validateWeight
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateWeight, weightController.addWeight);
router.get('/', verifyToken.headerToken, verifyUser, weightController.getWeight);
router.get('/:id', verifyToken.headerToken, verifyUser, weightController.getOneWeight);
router.get('/user/:userId', verifyTokens.verifyCoachToken, weightController.getOneUserWeight);
router.patch('/:id', verifyToken.headerToken, verifyUser, weightController.editWeight);
router.delete('/', verifyToken.headerToken, verifyUser, weightController.deleteWeight);
export default router;
