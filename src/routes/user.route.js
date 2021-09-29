import express from 'express';
import userController from '../controllers/user.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';

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

router.post('/resendcode', validateResendCode, userController.resendCode);

router.post('/forgetpassword', userController.sendResetPasswordCode);

router.post('/activate', validateResetPassword, userController.resetPassword);
export default router;
