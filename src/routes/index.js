import express from 'express';
import userRoute from './user.route';
import onBoardingRoute from './onBoarding.route'

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/onBoard', onBoardingRoute);
export default Router;
