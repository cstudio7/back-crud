import express from 'express';
import userRoute from './user.route';
import coachRoute from './coach.route';
import profileRoute from './profile.route';
import weightRoute from './weight.route';
import bloodPressureRoute from './bloodPressure.route';
import inspRoute from './inspiration.route';
import avatarRoute from './avatar.route';
import onBoardingRoute from './onBoarding.route'
import bloodPressureController from "../controllers/bloodPressure.controller";

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/', coachRoute);
Router.use('/onBoard', onBoardingRoute);
Router.use('/profile', profileRoute);
Router.use('/weight', weightRoute);
Router.use('/pressure', bloodPressureRoute);
Router.use('/inspiration', inspRoute);
Router.use('/avatar', avatarRoute);
export default Router;
