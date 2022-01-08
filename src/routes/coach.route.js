import express from 'express';
import coachController from '../controllers/coach.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';
import verifyToken from "../middlewares/coachToken/verify.coach.middleware";
import userController from "../controllers/user.controller";

const {
    validateSignup,
    validateLogin,
    validateActivateByCode,
    validateResendCode
} = InputValidation;

const router = express.Router();

router.post('/signup', validateSignup, coachController.CoachSignup);
router.post('/signin', validateLogin, coachController.signIn);
router.get('/me', verifyToken.verifyCoachToken, coachController.getCoach);
router.post('/coach/verify', validateActivateByCode, coachController.activateUserByCode );

router.post('/coach/resendcode', validateResendCode, coachController.resendCode);
router.get('/coach', coachController.getAllCoach);
router.patch('/me', verifyToken.verifyCoachToken, coachController.editCoachProfile);

export default router;
