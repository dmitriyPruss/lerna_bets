const yup = require('yup');
const {
  PAGINATION: {
    TEAM_VALIDATION: { REQUIRED },
    REQUEST_VALIDATION: { LIMIT, OFFSET }
  }
} = require('./../constants');

module.exports.PAGINATION_VALID_SCHEMA = yup.object().shape({
  limit: yup
    .number()
    .min(1, LIMIT.MIN)
    .max(20, LIMIT.MAX)
    .required(LIMIT.REQUIRED),
  offset: yup
    .number()
    .min(1, OFFSET.MIN)
    .required(OFFSET.REQUIRED)
});

const TEAM_SCHEMA = yup.string().matches(/^[A-Za-z0-9\s]{2,18}$/);

module.exports.NEW_BET_VALID_SCHEMA = yup.object().shape({
  ip: yup.string().required(),
  team: TEAM_SCHEMA.required(REQUIRED),
  betValue: yup
    .number()
    .min(100)
    .max(5000)
    .required(),
  isWinned: yup.boolean()
});

module.exports.CHANGED_BET_VALID_SCHEMA = yup.object().shape({
  ip: yup.string(),
  team: TEAM_SCHEMA,
  betValue: yup
    .number()
    .min(100)
    .max(5000),
  isWinned: yup.boolean()
});
