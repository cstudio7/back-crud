import express from 'express';
import userController from '../controllers/user.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';
// import '../config/passport.config';

const {
    validateSignup,
    validateLogin,
    validateActivateByCode,
    validateResetPassword,
    validateResetPasswordPh,
    validateResendCode,
    validateResendEmail,
    validateGoogleSignUp,
} = InputValidation;

const router = express.Router();

router.post('/signup', validateSignup, userController.signup);
router.post('/signin', validateLogin, userController.signIn);
router.post('/verify', validateActivateByCode, userController.activateUserByCode);


export default router;
