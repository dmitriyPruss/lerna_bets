import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {
  getTasksSaga,
  createTaskSaga,
  deleteTaskSaga,
  updateTaskSaga
} from './tasksSagas';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.GET_TASKS_ACTION, getTasksSaga);
  yield takeLatest(ACTION_TYPES.CREATE_TASK_ACTION, createTaskSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_TASK_ACTION, updateTaskSaga);
  yield takeLatest(ACTION_TYPES.DELETE_TASK_ACTION, deleteTaskSaga);
}

export default rootSaga;
