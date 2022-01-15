import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import InputValidation from '../helpers/Validations/activity.joi.validate';
import verifyUser from '../middlewares/verify.user.middleware';
import activityController from "../controllers/activity.controller";
const router = express.Router();

const {
    validateActivity
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateActivity, activityController.addActivity);
router.get('/', verifyToken.headerToken, verifyUser, activityController.getActivity);
router.get('/:id', verifyToken.headerToken, verifyUser, activityController.getOneActivity);
router.get('/user/:userId', verifyToken.headerToken, verifyUser, activityController.getOneUsersActivity);
router.patch('/:id', verifyToken.headerToken, verifyUser, activityController.editActivity);
router.delete('/', verifyToken.headerToken, verifyUser, activityController.deleteActivity);
export default router;
