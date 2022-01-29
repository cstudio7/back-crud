import express from 'express';
import foodController from '../controllers/food.controller';
import InputValidation from '../helpers/Validations/food.joi.validate';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyTokens from "../middlewares/coachToken/verify.coach.middleware";
const router = express.Router();

const {
    validateFood
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateFood, foodController.addFood);
router.get('/', verifyToken.headerToken, verifyUser, foodController.getFood);
router.get('/:id', verifyToken.headerToken, verifyUser, foodController.getOneFood);
router.get('/:userId', verifyToken.headerToken, verifyUser, foodController.getOneUsersFood);
router.get('/user/:userId', verifyTokens.verifyCoachToken, verifyUser, foodController.getOneUsersFood);
router.patch('/:id', verifyToken.headerToken, verifyUser, foodController.editFood);
router.delete('/', verifyToken.headerToken, verifyUser, foodController.deleteFood);
export default router;
