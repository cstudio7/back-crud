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
  static validateGoal(req, res, next) {
    const schema = Joi.object({
      title: Joi.string(),
      interval: Joi.string(),
      desc: Joi.string(),
      goal: Joi.string(),
      notification: Joi.boolean(),
      goalDay: Joi.array(),
      notificationDelay: Joi.string(),
      startDate: Joi.date(),
      startTime: Joi.string(),
      streak: Joi.array()
    });
    validation(req, res, schema, next);
  }
}
