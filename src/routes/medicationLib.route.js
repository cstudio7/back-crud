import express from 'express';
import medLibraryController from '../controllers/medLibrary.controller';
import InputValidation from '../helpers/Validations/foodLib.joi.validate';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
const router = express.Router();

const {
    validateFoodLib
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateFoodLib, medLibraryController.addMedDetails);
router.get('/', verifyToken.headerToken, verifyUser, medLibraryController.getMedLibrary);
router.get('/:id', verifyToken.headerToken, verifyUser, medLibraryController.getOneMedLib);
router.patch('/:id', verifyToken.headerToken, verifyUser, medLibraryController.editMedLibrary);
router.delete('/', verifyToken.headerToken, verifyUser, medLibraryController.deleteLibrary);
export default router;