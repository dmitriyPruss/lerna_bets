import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {
  getBetsSaga,
  createBetSaga,
  deleteBetSaga,
  updateBetSaga
} from './betsSagas';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.GET_BETS_ACTION, getBetsSaga);
  yield takeLatest(ACTION_TYPES.CREATE_BET_ACTION, createBetSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_BET_ACTION, updateBetSaga);
  yield takeLatest(ACTION_TYPES.DELETE_BET_ACTION, deleteBetSaga);
}

export default rootSaga;
