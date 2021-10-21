const createError = require('http-errors');
const _ = require('lodash');
const { Todo } = require('./../models');

module.exports.getTodos = async (req, res, next) => {
  const {
    pagination: { limit, offset }
  } = req;

  console.log(`req.pagination`, req.pagination);

  try {
    const foundTodos = await Todo.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit,
      offset
    });

    res.status(200).send({ data: foundTodos });
  } catch (error) {
    next(error);
  }
};

module.exports.createTodo = async (req, res, next) => {
  const { body } = req;

  try {
    const createdTodo = await Todo.create(body);
    const sendedTodo = _.omit(createdTodo.get(), [
      'id',
      'createdAt',
      'updatedAt'
    ]);

    res.status(201).send({ data: sendedTodo });
  } catch (error) {
    next(error);
  }
};

module.exports.changeTodo = async (req, res, next) => {
  const {
    params: { todoId },
    body
  } = req;

  try {
    const [updatedTodoCount, [updatedTodoData]] = await Todo.update(body, {
      where: { id: todoId },
      returning: true
    });

    if (updatedTodoCount) {
      const changedTodo = _.pick(updatedTodoData.get(), [
        'description',
        'isDone'
      ]);
      res.status(200).send({ data: changedTodo });
    }

    next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTodo = async (req, res, next) => {
  const {
    params: { todoId }
  } = req;

  try {
    const deletedTodoCount = await Todo.destroy({ where: { id: todoId } });

    deletedTodoCount
      ? res.status(204).send()
      : next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};
