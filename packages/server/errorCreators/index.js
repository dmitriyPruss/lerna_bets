const createError = require('http-errors');
const {
  ERRORS: { ERROR_404, ERROR_422 }
} = require('./../constants');

module.exports.createErr404 = createError(
  ERROR_404.ERROR_STATUS,
  ERROR_404.ERROR_MESSAGE
);

module.exports.createErr422 = createError(
  ERROR_422.ERROR_STATUS,
  ERROR_422.TITLE[0]
);
