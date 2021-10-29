import express from 'express';
import userRoute from './user.route';
import coachRoute from './coach.route';
import profileRoute from './profile.route';
import weightRoute from './weight.route';
import foodRoute from './food.route';
import bloodPressureRoute from './bloodPressure.route';
import a1cRoute from './a1c.route';
import inspRoute from './inspiration.route';
import avatarRoute from './avatar.route';
import onBoardingRoute from './onBoarding.route'

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/', coachRoute);
Router.use('/onBoard', onBoardingRoute);
Router.use('/profile', profileRoute);
Router.use('/weight', weightRoute);
Router.use('/goal', weightRoute);
Router.use('/food', foodRoute);
Router.use('/a1c', a1cRoute);
Router.use('/pressure', bloodPressureRoute);
Router.use('/inspiration', inspRoute);
Router.use('/avatar', avatarRoute);
export default Router;
