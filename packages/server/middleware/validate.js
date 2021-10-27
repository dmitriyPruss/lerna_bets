const {
  NEW_BET_VALID_SCHEMA,
  CHANGED_BET_VALID_SCHEMA
} = require('../utils/validationSchema');
const { createErr422 } = require('./../errorCreators');

module.exports.validateNewBet = async (req, res, next) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return next();
  }

  try {
    if (await NEW_BET_VALID_SCHEMA.isValid(req.body)) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.validateChangedBet = async (req, res, next) => {
  if (await CHANGED_BET_VALID_SCHEMA.isValid(req.body)) {
    return next();
  }

  next(createErr422);
};
