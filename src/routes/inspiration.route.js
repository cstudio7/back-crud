import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import InputValidation from '../helpers/Validations/inspiration.joi.validate';
import inspirationController from "../controllers/inspiration.controller";
const router = express.Router();

const {
    validateInspiration
} = InputValidation

router.post('/', verifyToken.headerToken, verifyUser, validateInspiration, inspirationController.addInspiration);
router.get('/',  inspirationController.getAllInspiration);
router.get('/:id',  inspirationController.getInspiration);
router.patch('/:id', verifyToken.headerToken, verifyUser, inspirationController.editInspiration);
router.delete('/', verifyToken.headerToken, verifyUser, inspirationController.deleteInspiration);
export default router;
