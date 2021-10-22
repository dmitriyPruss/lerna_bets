const createError = require('http-errors');
const _ = require('lodash');
const { Task } = require('../models');

module.exports.getTasks = async (req, res, next) => {
  const {
    pagination: { limit, offset }
  } = req;

  console.log(`req.pagination`, req.pagination);

  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit,
      offset
    });

    console.log(`GET - foundTodos`, foundTasks);

    res.status(200).send({ data: foundTasks });
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  const { body } = req;

  console.log(`body`, body);

  try {
    const createdTask = await Task.create(body);

    console.log(`createdTask.get()`, createdTask.get());
    const sendedTask = _.omit(createdTask.get(), ['createdAt', 'updatedAt']);

    console.log(`CREATE - sendedTask`, sendedTask);
    return res.status(201).send({ data: sendedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.changeTask = async (req, res, next) => {
  const {
    params: { taskId },
    body
  } = req;

  console.log(`body`, body);
  console.log(`taskId`, taskId);

  body.isDone = !body.isDone;
  console.log(`body changed`, body);

  try {
    const [updatedTaskCount, [updatedTask]] = await Task.update(body, {
      where: { id: taskId },
      returning: true
    });

    console.log(`updatedTask.get()`, updatedTask.get());

    if (updatedTaskCount > 0) {
      const changedTask = _.omit(updatedTask.get(), ['createdAt', 'updatedAt']);
      return res.status(200).send({ data: changedTask });
    }
    next(createError(404, 'Not Found'));
  } catch (e) {
    next(e);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  const {
    params: { taskId }
  } = req;

  console.log(`DELETE - taskId`, taskId);

  try {
    const deletedTaskCount = await Task.destroy({ where: { id: taskId } });

    console.log(`deletedTaskCount `, deletedTaskCount);

    if (deletedTaskCount) {
      return res.status(204).send();
    }
    next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};
