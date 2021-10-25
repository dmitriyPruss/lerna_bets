import { put } from 'redux-saga/effects';
import {
  getBetsRequest,
  getBetsSuccess,
  getBetsError,
  createBetRequest,
  createBetSuccess,
  createBetError,
  deleteBetRequest,
  deleteBetSuccess,
  deleteBetError,
  updateBetRequest,
  updateBetSuccess,
  updateBetError
} from '../actions';
import * as API from '../api';

export function * getBetsSaga () {
  yield put(getBetsRequest());

  try {
    const {
      data: { data: bets }
    } = yield API.getBets();

    yield put(getBetsSuccess(bets));
  } catch (error) {
    yield put(getBetsError(error));
  }
}

export function * createBetSaga (action) {
  const { bet } = action;

  yield put(createBetRequest());

  try {
    const {
      data: { data: newBet }
    } = yield API.createBet(bet);

    yield put(createBetSuccess(newBet));
  } catch (error) {
    yield put(createBetError(error));
  }
}

export function * updateBetSaga (action) {
  const { id, isWinned } = action;

  yield put(updateBetRequest());

  try {
    const {
      data: { data: changedBet }
    } = yield API.updateBet(id, isWinned);
    yield put(updateBetSuccess(changedBet));
  } catch (error) {
    yield put(updateBetError(error));
  }
}

export function * deleteBetSaga (action) {
  const { id } = action;

  yield put(deleteBetRequest());

  try {
    yield API.deleteBet(id);
    yield put(deleteBetSuccess(id));
  } catch (error) {
    yield put(deleteBetError(error));
  }
}
