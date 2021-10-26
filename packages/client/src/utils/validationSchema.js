import * as yup from 'yup';
import CONSTANTS from '../constants';

const {
  VALIDATION: {
    INPUT: { TEAM }
  }
} = CONSTANTS;

export const INPUT_SCHEMA = yup.object({
  team: yup
    .string()
    .min(2, TEAM.MIN)
    .max(18, TEAM.MAX)
    .required(TEAM.REQUIRED)
});
