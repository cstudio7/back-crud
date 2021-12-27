import express from 'express';
import verifyToken from '../middlewares/coachToken/verify.coach.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import InputValidation from '../helpers/Validations/inspiration.joi.validate';
import inspirationController from "../controllers/inspiration.controller";
const router = express.Router();

const {
    validateInspiration
} = InputValidation

router.post('/', verifyToken.verifyCoachToken, validateInspiration, inspirationController.addInspiration);
router.get('/',  inspirationController.getAllInspiration);
router.get('/',  inspirationController.getInspiration);
router.get('/:id',  inspirationController.getOneInspiration);
router.patch('/:id', verifyToken.verifyCoachToken, verifyUser, inspirationController.editInspiration);
router.delete('/', verifyToken.verifyCoachToken, verifyUser, inspirationController.deleteInspiration);
export default router;
