const { Router } = require('express');
const { todoController } = require('../controllers');
const { paginate } = require('./../middleware');

const todoRouter = Router();

todoRouter
  .route('/')
  .get(paginate.paginateTodos, todoController.getTodos)
  .post(todoController.createTodo);

todoRouter
  .route('/:todoId')
  .patch(todoController.changeTodo)
  .delete(todoController.deleteTodo);

module.exports = todoRouter;
