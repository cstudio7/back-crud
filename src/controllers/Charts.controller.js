import Statistics from "../helpers/Statistics";
import db from '../database/models';
import response from '../helpers/response.helper';

/**
 * @description Get daily statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and object containing the message and the number of books read by the user
 **/

const getDailyStatistic = async (req, res) => {
    try {
        const statGlucose = await db.glucose.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue']
        });

        const statPressure = await db.blood.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue', 'bpm']
        });

        //Try to get all Endpoints for week, month and year in one request
        return res.status(200).json({
            message: 'Your Reading Statistic Today',
            Glucose: Statistics.week(statGlucose),
            Pressure: Statistics.week(statPressure),
            Bpm: Statistics.weeks(statPressure),
        });
    } catch (err) {
        return response.errorMessage( res, err.message, 400);
    }
}

/**
 * @description Get weekly statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getMonthlyStatistic = async (req, res) => {
    try {
        const statGlucose = await db.glucose.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue']
        });

        const statPressure = await db.blood.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue', 'bpm']
        });

        return res.status(200).json({
            message: 'Your Reading Statistic Today',
            Glucose: Statistics.calMonth(statGlucose),
            Pressure: Statistics.calMonth(statPressure),
            Bpm: Statistics.calMonths(statPressure)
        });
    } catch (err) {
        return response.errorMessage( res, err.message, 400);
    }
};

/**
 * @description Get monthly statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getYearlyStatistic = async (req, res) => {
    try {
        const statGlucose = await db.glucose.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue']
        });

        const statPressure = await db.blood.findAll({
            where: {
                userId: '0761c71e-0f31-461c-a9cd-a22de6bc3d9b',
            },
            attributes: ['createdAt', 'readingValue', 'bpm']
        });

        return res.status(200).json({
            message: 'Your Reading Statistic Today',
            Glucose: Statistics.calYear(statGlucose),
            Pressure: Statistics.calYear(statPressure),
            Bpm: Statistics.calYears(statPressure),
        });
    } catch (err) {
        return response.errorMessage( res, err.message, 400);
    }
};

const controller = {
    getDailyStatistic,
    getMonthlyStatistic,
    getYearlyStatistic,
};

export default controller;
