const yup = require('yup');

module.exports.PAGINATION_VALID_SCHEMA = yup.object().shape({
  limit: yup
    .number()
    .min(1, 'Limit - less than the min value')
    .max(20, 'Limit -more than the max value')
    .required('Limit value must not be empty'),
  offset: yup
    .number()
    .min(1, 'Offset - less than the min value')
    .required('Offset value must not be empty')
});
