import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import bloodGlucoseController from "../controllers/Charts.controller";
const router = express.Router();

router.get('/weekly', verifyToken.headerToken, verifyUser, bloodGlucoseController.getDailyStatistic);
router.get('/monthly', verifyToken.headerToken, verifyUser, bloodGlucoseController.getMonthlyStatistic);
router.get('/yearly', verifyToken.headerToken, verifyUser, bloodGlucoseController.getYearlyStatistic);
export default router;
