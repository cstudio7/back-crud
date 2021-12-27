import express from 'express';
import coachController from '../controllers/coach.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';
import verifyToken from "../middlewares/verify.token.middleware";

const {
    validateSignup,
    validateLogin,
} = InputValidation;

const router = express.Router();

router.post('/signup', validateSignup, coachController.CoachSignup);
router.post('/signin', validateLogin, coachController.signIn);
router.get('/me', verifyToken.headerToken, coachController.getCoach);
router.get('/coach', coachController.getAllCoach);
router.patch('/me', verifyToken.headerToken, coachController.editCoachProfile);

export default router;
