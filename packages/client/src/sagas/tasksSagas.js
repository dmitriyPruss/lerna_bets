import { put } from 'redux-saga/effects';
import {
  getTasksRequest,
  getTasksSuccess,
  getTasksError,
  createTaskRequest,
  createTaskSuccess,
  createTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError
} from '../actions';
import * as API from './../api';

export function * getTasksSaga () {
  yield put(getTasksRequest());

  try {
    const {
      data: { data: tasks }
    } = yield API.getTasks();

    yield put(getTasksSuccess(tasks));
  } catch (error) {
    yield put(getTasksError(error));
  }
}

export function * createTaskSaga (action) {
  const { task } = action;

  yield put(createTaskRequest());

  try {
    const {
      data: { data: newTask }
    } = yield API.createTask(task);
    yield put(createTaskSuccess(newTask));
  } catch (error) {
    yield put(createTaskError(error));
  }
}

export function * deleteTaskSaga (action) {
  const { id } = action;

  yield put(deleteTaskRequest());

  try {
    yield API.deleteTask(id);
    yield put(deleteTaskSuccess(id));
  } catch (error) {
    yield put(deleteTaskError(error));
  }
}

export function * updateTaskSaga (action) {
  const { id } = action;

  yield put(updateTaskRequest());

  try {
    const {
      data: { data: newTasks }
    } = yield API.updateTask(id);
    yield put(updateTaskSuccess(newTasks));
  } catch (error) {
    yield put(updateTaskError(error));
  }
}
