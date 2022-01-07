import response from '../helpers/response.helper';
import db from '../database/models';
import UserServices from "../services/user.service";

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class onBoardingController {
    /**
     * Add an onBoarded patient data in the database
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @returns {Object} A user object with selected fields
     */
    static async createBoard(req, res) {
        try {
            const { id, email } = req.user;
            const existingUser = await db.onBoarding.findOne({
                where: {userId: id}
            });
            if(existingUser) {
                return response.errorMessage(res, 'user already onBoarded', 409);
            }

            const { manage, typeOfDiabetes, habit, habitDetails, improvement,
                habitManagement, conditionOfHypertension,
                diagnosedDate, diagnosedStyle, insulin, relatedComplication,
                comorbidities, onMedication, medicationInterval,
                medicationDetails, averageBloodGlucose, averageBloodPressure,
                bloodGlucose, weight, height, mainGoal, isCareTeamPresent,
                careTeam, isCareTeamList, progressRate, needsACareTeam,
                foodTimetable, personalizedFoodTimetable
            } = req.body;
            const newOnBoard = {
                userId: id, manage, typeOfDiabetes, habit, habitDetails, improvement,
                habitManagement, conditionOfHypertension,
                diagnosedDate, diagnosedStyle, insulin, relatedComplication,
                comorbidities, onMedication, medicationInterval,
                medicationDetails, averageBloodGlucose, averageBloodPressure,
                bloodGlucose, weight, height, mainGoal, isCareTeamPresent,
                careTeam, isCareTeamList, progressRate, needsACareTeam,
                foodTimetable, personalizedFoodTimetable
            };
            const profile = {
                typeOfHypertension: conditionOfHypertension,
                manage,
                bloodGlucose: averageBloodGlucose,
                bloodPressure: averageBloodPressure,
                weight,
                height,
                diagnosedDate,
            };
            await req.user.update(profile);
            const board = await db.onBoarding.create(newOnBoard);
            const data = { board };
            response.successMessage(res, 'onBoarded successfully', 201, data);
        } catch (e) {
            console.log(e)
            return response.errorMessage(res, e.message, 400);
        }
    }

    /**
     * User can get all client associated to a user
     * @param {int} req This is the parameter(user id) that will be passed in url
     * @param {object} res This is a response will be send to the user
     * @returns {object} return object which include status and message
     */
    static async getBoard(req, res) {
        try {
            const { id } = req.params;
            const board = await db.onBoarding.findOne({where:{id}});
            const data = {
                board,
            };
            response.successMessage(res, 'onBoarding Data', 200, data);
        } catch (e) {
            return response.errorMessage(res, e.message, 400);
        }
    }

    /**
     * User can get all client associated to a user
     * @param {int} req This is the parameter(user id) that will be passed in url
     * @param {object} res This is a response will be send to the user
     * @returns {object} return object which include status and message
     */
    static async getUserBoard(req, res) {
        try {
            const { id } = req.params;
            const board = await db.onBoarding.findOne({where:{
                userId: id
            }});
            const data = {
                board,
            };
            response.successMessage(res, 'onBoarding Data', 200, data);
        } catch (e) {
            return response.errorMessage(res, e.message, 400);
        }
    }

    /**
     * User can get all client associated to a user
     * @param {int} req This is the parameter(user id) that will be passed in url
     * @param {object} res This is a response will be send to the user
     * @returns {object} return object which include status and message
     */
    static async editBoard(req, res) {
        try {
            const { id } = req.params;
            const infoData = req.body;
            const updateData = await db.onBoarding.findOne({ where: { id } });
            const newData = await updateData.update(infoData);
            const data = {
                newData,
            };
            response.successMessage(res, 'Resource Updated Successfully.', 200, data);
        } catch (e) {
            return response.errorMessage(res, e.message, 400);
        }
    }
}

export default onBoardingController;
