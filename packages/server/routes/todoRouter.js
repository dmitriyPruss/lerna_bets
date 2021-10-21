const { Router } = require('express');
const { todoController } = require('../controllers');
const { paginateMw, validateMw } = require('./../middleware');

const todoRouter = Router();

todoRouter
  .route('/')
  .get(paginateMw.paginateTodos, todoController.getTodos)
  .post(validateMw.validateNewTask, todoController.createTodo);

todoRouter
  .route('/:taskId')
  .patch(validateMw.validateChangedTask, todoController.changeTodo)
  .delete(todoController.deleteTodo);

module.exports = todoRouter;
