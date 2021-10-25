const {
  Sequelize: { BaseError }
} = require('../models');
const {
  ERRORS: { ERROR_422, ERROR_500 }
} = require('./../constants');

module.exports.validateErrHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(422).send({
      errors: [
        {
          status: ERROR_422.ERROR_STATUS,
          code: ERROR_422.ERROR_CODE,
          title: ERROR_422.TITLE[0],
          details: err.errors
        }
      ]
    });
  }
  next(err);
};

module.exports.sequelizeErrHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(422).send({
      errors: [
        {
          status: ERROR_422.ERROR_STATUS,
          code: ERROR_422.ERROR_CODE,
          title: ERROR_422.TITLE[1],
          details: err.errors
        }
      ]
    });
  }
  next(err);
};

module.exports.commonErrHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  res
    .status(err?.status ?? ERROR_500.ERROR_STATUS)
    .send({ errors: [{ title: err?.message ?? ERROR_500.ERROR_MESSAGE }] });
};
