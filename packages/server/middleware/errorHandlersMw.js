const {
  Sequelize: { BaseError }
} = require('./../models');

module.exports.validateErrHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res
      .status(422)
      .send({ errors: [{ title: 'Validation Error', details: err.errors }] });
  }
  next(err);
};

module.exports.sequelizeErrHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(422).send({
      errors: [
        {
          title: 'SQL database error (Sequelize base error)',
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
    .status(err?.status ?? 500)
    .send({ errors: [{ title: err?.message ?? 'Internal server error' }] });
};
