import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class onBoardingTypesController {
    /**
     * Add an onBoardedTypes data in the database
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @returns {Object} A user object with selected fields
     */
    static async createBoardTypes(req, res) {
        try {
            const { name, form } = req.body;
            const NewForm = {
                name,
                form
            };
            const onBoardingTypes = await db.onBoardingType.create(NewForm);
            const data = {
                onBoardingTypes,
            };
            return response.successMessage(res, 'onBoardingType added successfully', 201, data);
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
    static async getBoardTypes(req, res) {
        try {
            const onBoardingTypes = await db.onBoardingType.findAll();
            const data = {
                onBoardingTypes,
            };
            return response.successMessage(res, 'onBoardingTypes', 200, data);
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
    static async getOneBoardTypes(req, res) {
        const { id } = req.query;
        try {
            const onBoardingType = await db.onBoardingType.findOne({
                where: { id },
            });
            const data = {
                onBoardingType,
            };
            return response.successMessage(res, 'onBoardingType', 200, data);
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
    static async editOnBoardTypes(req, res) {
        try {
            const { id } = req.query;
            const infoData = req.body;

            const typeToUpdate = await db.onBoardingType.findOne({ where: { id } });
            const onBoardingType = await typeToUpdate.update(infoData);
            const data = {
                onBoardingType
            };
            return response.successMessage(res, 'onBoardingType edited successfully', 200, data);
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
    static async deleteOnBoardingTypes(req, res) {
        try {
            const { id } = req.query;
            const measurementType = await db.onBoardingType.destroy({ where: { id } });
            if (!measurementType) {
                return response.successMessage(res, 'onBoardingType not found', 200);
            }
            return response.successMessage(res, 'onBoardingType deleted successfully', 200);
        } catch (e) {
            return response.errorMessage(res, e.message, 400);
        }
    }

}

export default onBoardingTypesController;
