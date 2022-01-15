import express from 'express';
import goalController  from '../controllers/goal.controller';
import InputValidation from '../helpers/Validations/goal.joi.validate';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
const router = express.Router();

const {
    validateGoal
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateGoal, goalController.addGoal );
router.get('/', verifyToken.headerToken, verifyUser, goalController.getGoal );
router.get('/:status', verifyToken.headerToken, verifyUser, goalController.getStatusGoal);
router.get('/:id', verifyToken.headerToken, verifyUser, goalController.getOneGoal);
router.get('/user/:userId', verifyToken.headerToken, verifyUser, goalController.getOneUsersGoal);
router.patch('/:id', verifyToken.headerToken, verifyUser, goalController.editGoal );
router.delete('/', verifyToken.headerToken, verifyUser, goalController.deleteGoal );
export default router;
