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
      diagnosedDate: Joi.string(),
      diagnosedStyle: Joi.string(),
      insulin: Joi.string(),
      diabetesRelatedComplication: Joi.string(),
      comorbidities: Joi.string(),
      onMedication: Joi.string(),
      medicationInterval: Joi.string(),
      medicationDetails: Joi.array(),
      averageBloodGlucose: Joi.string(),
      mainGoal: Joi.array(),
      careTeam: Joi.array(),
    });
    validation(req, res, schema, next);
  }
}