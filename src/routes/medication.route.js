import express from 'express';
import medicationController from '../controllers/medication.controller';
import InputValidation from '../helpers/Validations/medication.joi.validate';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
const router = express.Router();

const {
    validateMedication
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateMedication, medicationController.addMedication);
router.get('/', verifyToken.headerToken, verifyUser, medicationController.getMedication);
router.get('/:id', verifyToken.headerToken, verifyUser, medicationController.getOneMed);
router.get('/user/:userId', verifyToken.headerToken, verifyUser, medicationController.getOneUsersMed);
router.patch('/:id', verifyToken.headerToken, verifyUser, medicationController.editMedication);
router.delete('/', verifyToken.headerToken, verifyUser, medicationController.deleteMedication);
export default router;
