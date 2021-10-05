import express from 'express';
import coachController from '../controllers/coach.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';

const {
    validateSignup,
    validateLogin,
} = InputValidation;

const router = express.Router();

router.post('/signup', validateSignup, coachController.CoachSignup);
router.post('/signin', validateLogin, coachController.signIn);

export default router;
