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
  static validateGlucosePressure(req, res, next) {
    const schema = Joi.object({
      type: Joi.string(),
      readingValue: Joi.string(),
      readingType: Joi.string(),
      note: Joi.string(),
      startTime: Joi.string()
    });
    validation(req, res, schema, next);
  }
}
