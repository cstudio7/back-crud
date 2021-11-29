import express from 'express';
import userRoute from './user.route';
import coachRoute from './coach.route';
import profileRoute from './profile.route';
import weightRoute from './weight.route';
import goalRoute from './goal.route';
import foodRoute from './food.route';
import foodLibRoute from './foodLib.route';
import bloodPressureRoute from './bloodPressure.route';
import bloodGlucoseRoute from './bloodGlucose.route';
import statGlucoseRoute from './chartGlucose.route';
import a1cRoute from './a1c.route';
import activityRoute from './activity.route';
import medicationRoute from './medication.route';
import medicationLibRoute from './medicationLib.route';
import inspRoute from './inspiration.route';
import avatarRoute from './avatar.route';
import onBoardingRoute from './onBoarding.route'

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/', coachRoute);
Router.use('/onBoard', onBoardingRoute);
Router.use('/profile', profileRoute);
Router.use('/weight', weightRoute);
Router.use('/goal', goalRoute);
Router.use('/food', foodRoute);
Router.use('/foodlib', foodLibRoute);
Router.use('/a1c', a1cRoute);
Router.use('/activity', activityRoute);
Router.use('/medication', medicationRoute);
Router.use('/medicationlib', medicationLibRoute);
Router.use('/pressure', bloodPressureRoute);
Router.use('/glucose', bloodGlucoseRoute);
Router.use('/stat', statGlucoseRoute);
Router.use('/inspiration', inspRoute);
Router.use('/avatar', avatarRoute);
export default Router;
