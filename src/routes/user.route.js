import express from 'express';
import isValid from '../middlewares/validate.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyAdmin from '../middlewares/admin.verify.middleware';
import userValidations from '../middlewares/userValidation';
import verifyUser from '../middlewares/verify.user.middleware';
import userController from '../controllers/user.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';
import '../config/passport.config';

const router = express.Router();

const {
  validateSignup,
  validateLogin,
  validateActivate,
  validateResetPassword,
  validateResetPasswordPh,
  validateResendCode,
  validateResendEmail,
  validateGoogleSignUp,
} = InputValidation;

router.post('/signup', validateSignup, userController.signup);

router.post(
  '/signup/google',
  validateGoogleSignUp,
  verifyToken.googleHeaderToken,
  userController.googleUp
);

router.patch('/chpassword', verifyToken.headerToken, userController.changePassword);

router.post('/signin/google', verifyToken.googleHeaderToken, userController.googleIn);

router.post('/signin', validateLogin, userController.signIn);

router.post('/resendcode', validateResendCode, userController.resendCode);

router.post('/resendemail', validateResendEmail, userController.resendEmail);

router.get('/verify', verifyToken.verifyUserToken, userController.updatedUserEmail);

router.post('/activate', validateActivate, userValidations.verify, userController.updatedUser);

router.get('/profile/me', verifyToken.headerToken, userController.viewProfile);

router.patch('/profile/me', verifyToken.headerToken, userController.editProfile);

router.post('/forgetpassword', isValid, userController.sendResetPasswordLink);

router.patch('/logout', verifyToken.verifyUserTokenId, userController.logout);

router.patch(
  '/reset-password',
  validateResetPassword,
  isValid,
  verifyToken.verifyUserToken,
  userController.resetPassword
);

router.patch('/reset-password-ph', validateResetPasswordPh, userController.resetPasswordByPhone);

router.patch(
  '/:userId/settings',
  verifyToken.headerToken,
  verifyUser,
  verifyAdmin,
  userController.updateRole
);

export default router;
