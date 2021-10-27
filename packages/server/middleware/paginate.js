const { PAGINATION_VALID_SCHEMA } = require('../utils/validationSchema');
const {
  PAGINATION: { LIMIT_HTTP_REQUEST_DEFAULT, OFFSET_DEFAULT }
} = require('./../constants');

module.exports.paginateBets = async (req, res, next) => {
  if (
    Object.values(req.query).length === 0 &&
    req.query.constructor === Object
  ) {
    req.emptyQuery = true;
  }

  const {
    query: { page, items }
  } = req;

  const defaultPagination = {
    limit: LIMIT_HTTP_REQUEST_DEFAULT,
    offset: OFFSET_DEFAULT
  };

  const pagination = {
    limit: items ?? LIMIT_HTTP_REQUEST_DEFAULT,
    offset: (page - 1) * items || OFFSET_DEFAULT
  };

  try {
    (await PAGINATION_VALID_SCHEMA.isValid(pagination))
      ? (req.pagination = pagination)
      : (req.pagination = defaultPagination);
  } catch (error) {
    next(error);
  }

  next();
};
