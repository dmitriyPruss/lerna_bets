const { Router } = require('express');
const { taskController } = require('../controllers');
const { paginate, validate } = require('../middleware');

const taskRouter = Router();

taskRouter
  .route('/')
  .get(paginate.paginateTasks, taskController.getTasks)
  .post(
    paginate.paginateTasks,
    validate.validateNewTask,
    taskController.createTask
  );

taskRouter
  .route('/:taskId')
  .patch(validate.validateChangedTask, taskController.changeTask)
  .delete(taskController.deleteTask);

module.exports = taskRouter;
