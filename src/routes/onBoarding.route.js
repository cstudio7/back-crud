import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import onBoardingController from '../controllers/onBoarding.controller';
import InputValidation from '../helpers/Validations/onBoarding.joi.validate';

const router = express.Router();

const { validateOnBoard } = InputValidation;

router.post('/',  verifyToken.paramTokenUsers, validateOnBoard, onBoardingController.createBoard);

router.get('/:id', verifyToken.paramTokenUsers, onBoardingController.getBoard);

router.get('/user/:id', verifyToken.paramTokenUsers, onBoardingController.getUserBoard);

router.patch('/:id', verifyToken.paramTokenUsers, onBoardingController.editBoard);

export default router;
