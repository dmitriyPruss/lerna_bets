const createError = require('http-errors');
const {
  NEW_TASK_VALID_SCHEMA,
  CHANGED_TASK_VALID_SCHEMA
} = require('../utils/validationSchema');

module.exports.validateNewTask = async (req, res, next) => {
  try {
    if (await NEW_TASK_VALID_SCHEMA.isValid(req.body)) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.validateChangedTask = async (req, res, next) => {
  if (await CHANGED_TASK_VALID_SCHEMA.isValid(req.body)) {
    return next();
  }

  next(createError(422, 'Validation Error'));
};
