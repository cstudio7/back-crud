import express from 'express';
import InputValidation from '../helpers/Validations/foodLib.joi.validate';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import foodLibraryController from "../controllers/foodLibrary.controller";
const router = express.Router();

const {
    validateFoodLib
} = InputValidation;

router.post('/', verifyToken.headerToken, verifyUser, validateFoodLib, foodLibraryController.addFoodDetails );
router.get('/', verifyToken.headerToken, verifyUser, foodLibraryController.getFoodLibrary);
router.get('/:id', verifyToken.headerToken, verifyUser, foodLibraryController.getOneFoodLib);
router.get('/user/:userId', verifyToken.headerToken, verifyUser, foodLibraryController.getOneUsersFoodLib);
router.patch('/:id', verifyToken.headerToken, verifyUser, validateFoodLib, foodLibraryController.editFoodLib);
router.delete('/', verifyToken.headerToken, verifyUser, foodLibraryController.deleteLibrary);
export default router;
