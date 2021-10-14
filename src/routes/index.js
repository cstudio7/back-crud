import express from 'express';
import userRoute from './user.route';
import coachRoute from './coach.route';
import profileRoute from './profile.route';
import avatarRoute from './avatar.route';
import onBoardingRoute from './onBoarding.route'

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/', coachRoute);
Router.use('/onBoard', onBoardingRoute);
Router.use('/profile', profileRoute);
Router.use('/avatar', avatarRoute);
export default Router;
