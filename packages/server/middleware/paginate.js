const _ = require('lodash');
const { PAGINATION_VALID_SCHEMA } = require('../utils/validationSchema');

module.exports.paginateTasks = async (req, res, next) => {
  const {
    query: { page, items }
  } = req;

  console.log(`req.query`, req.query);
  if (_.isEmpty(req.query)) {
    req.emptyQuery = true;
  }

  console.log(`req.emptyQuery`, req.emptyQuery);
  const defaultPagination = { limit: 7, offset: 0 };

  const pagination = {
    limit: items ?? 7,
    offset: (page - 1) * items || 0
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
