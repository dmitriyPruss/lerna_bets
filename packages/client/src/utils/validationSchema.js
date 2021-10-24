import * as yup from 'yup';

export const INPUT_SCHEMA = yup.object({
  description: yup
    .string()
    .min(2, 'Very few symbols!')
    .max(27, 'Too much symbols!')
    .required('Field musn`t be empty!')
});
