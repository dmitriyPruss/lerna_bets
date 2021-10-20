const { Router } = require('express');
const { todoController } = require('../controllers');

const todoRouter = Router();

todoRouter
  .route('/')
  .get(todoController.getTodos)
  .post(todoController.createTodo);

todoRouter
  .route('/:todoId')
  .patch(todoController.changeTodo)
  .delete(todoController.deleteTodo);

module.exports = todoRouter;
