const { PAGINATION_VALID_SCHEMA } = require('./../utils/validationSchema');

module.exports.paginateTodos = async (req, res, next) => {
  const {
    query: { page, items }
  } = req;

  const defaultPagination = { limit: 7, offset: 0 };

  const pagination = {
    limit: items ?? 7,
    offset: (page - 1) * items || 0
  };

  try {
    (await PAGINATION_VALID_SCHEMA.isValid(pagination))
      ? (console.log(true), (req.pagination = pagination))
      : (console.log(false), (req.pagination = defaultPagination));
  } catch (error) {
    next(error);
  }

  next();
};
