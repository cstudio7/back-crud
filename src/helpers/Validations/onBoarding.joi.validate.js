/* eslint-disable require-jsdoc */
import Joi from 'joi';
import response from '../response.helper';

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, req.params, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach((detail) => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    const err = errorMessages.toString();
    return response.errorMessage(res, err, 400);
  }

  return next();
};

export default class InputValidation {
  static validateOnBoard(req, res, next) {
    const schema = Joi.object({
      userId: Joi.string(),
      manage: Joi.string(),
      typeOfDiabetes: Joi.string(),
      habit: Joi.string(),
      habitDetails: Joi.string(),
      improvement: Joi.boolean(),
      habitManagement: Joi.array(),
      conditionOfHypertension: Joi.string(),
      diagnosedDate: Joi.string(),
      diagnosedStyle: Joi.string(),
      insulin: Joi.boolean(),
      relatedComplication: Joi.array(),
      comorbidities: Joi.array(),
      onMedication: Joi.boolean(),
      medicationInterval: Joi.string(),
      medicationDetails: Joi.array(),
      averageBloodGlucose: Joi.string(),
      averageBloodPressure: Joi.string(),
      bloodGlucose: Joi.string(),
      weight: Joi.string(),
      height: Joi.string(),
      mainGoal: Joi.array(),
      isCareTeamPresent: Joi.boolean(),
      careTeam: Joi.array(),
      isCareTeamList: Joi.boolean(),
      progressRate: Joi.string(),
      needsACareTeam: Joi.boolean(),
      foodTimetable : Joi.boolean(),
      personalizedFoodTimetable : Joi.boolean(),
    });
    validation(req, res, schema, next);
  }
}
