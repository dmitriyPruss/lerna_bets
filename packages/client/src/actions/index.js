import ACTION_TYPES from './actionTypes';

export const addTask = data => ({ type: ACTION_TYPES.ADD_TASK, data });

export const deleteTask = id => ({
  type: ACTION_TYPES.DELETE_TASK,
  id
});

export const checkTask = changedInfo => ({
  type: ACTION_TYPES.CHECK_TASK,
  changedInfo
});

//SAGA
// Create:
export const createTaskAction = task => ({
  type: ACTION_TYPES.CREATE_TASK_ACTION,
  task
});

export const createTaskRequest = () => ({
  type: ACTION_TYPES.CREATE_TASK_REQUEST
});

export const createTaskSuccess = task => ({
  type: ACTION_TYPES.CREATE_TASK_SUCCESS,
  task
});

export const createTaskError = error => ({
  type: ACTION_TYPES.CREATE_TASK_ERROR,
  error
});

//Read
export const getTasksAction = () => ({
  type: ACTION_TYPES.GET_TASKS_ACTION
});

export const getTasksRequest = () => ({
  type: ACTION_TYPES.GET_TASKS_REQUEST
});

export const getTasksSuccess = tasks => ({
  type: ACTION_TYPES.GET_TASKS_SUCCESS,
  tasks
});

export const getTasksError = error => ({
  type: ACTION_TYPES.GET_TASKS_ERROR,
  error
});

//Delete:
export const deleteTaskAction = id => ({
  type: ACTION_TYPES.DELETE_TASK_ACTION,
  id
});

export const deleteTaskRequest = () => ({
  type: ACTION_TYPES.DELETE_TASK_REQUEST
});

export const deleteTaskSuccess = id => ({
  type: ACTION_TYPES.DELETE_TASK_SUCCESS,
  id
});

export const deleteTaskError = error => ({
  type: ACTION_TYPES.DELETE_TASK_ERROR,
  error
});

//Update:
export const updateTaskAction = id => ({
  type: ACTION_TYPES.UPDATE_TASK_ACTION,
  id
});

export const updateTaskRequest = () => ({
  type: ACTION_TYPES.UPDATE_TASK_REQUEST
});

export const updateTaskSuccess = id => ({
  type: ACTION_TYPES.UPDATE_TASK_SUCCESS,
  id
});

export const updateTaskError = error => ({
  type: ACTION_TYPES.UPDATE_TASK_ERROR,
  error
});
