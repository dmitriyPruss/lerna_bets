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

    console.log(`GET - foundTodos`, foundTodos);

    res.status(200).send({ data: foundTodos });
  } catch (error) {
    next(error);
  }
};

module.exports.createTodo = async (req, res, next) => {
  const { body } = req;

  console.log(`body`, body);

  try {
    const createdTodo = await Todo.create(body);

    console.log(`createdTodo.get()`, createdTodo.get());
    const sendedTodo = _.omit(createdTodo.get(), ['createdAt', 'updatedAt']);

    console.log(`CREATE - sendedTodo`, sendedTodo);
    res.status(201).send({ data: sendedTodo });
  } catch (error) {
    next(error);
  }
};

module.exports.changeTodo = async (req, res, next) => {
  const {
    params: { taskId }
  } = req;

  try {
    const changedTodo = await Todo.findByPk(taskId);
    changedTodo.isDone = !changedTodo.isDone;

    console.log(`changedTodo`, changedTodo.get());
    const [updatedTodoCount] = await Todo.update(changedTodo.get(), {
      where: { id: taskId }
    });

    if (updatedTodoCount) {
      return res.status(204).send();
    }

    next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTodo = async (req, res, next) => {
  const {
    params: { taskId }
  } = req;

  console.log(`DELETE - taskId`, taskId);

  try {
    const deletedTodoCount = await Todo.destroy({ where: { id: taskId } });

    console.log(`deletedTodoCount `, deletedTodoCount);

    deletedTodoCount
      ? res.status(204).send()
      : next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};
