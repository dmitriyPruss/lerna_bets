const createError = require('http-errors');
const _ = require('lodash');
const { Task } = require('../models');

module.exports.getTasks = async (req, res, next) => {
  const {
    pagination: { limit, offset }
  } = req;

  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit,
      offset
    });

    res.status(200).send({ data: foundTasks });
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  const { body } = req;

  try {
    const createdTask = await Task.create(body);
    const sendedTask = _.omit(createdTask.get(), ['createdAt', 'updatedAt']);

    return res.status(201).send({ data: sendedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.changeTask = async (req, res, next) => {
  const {
    params: { taskId },
    body: { isDone }
  } = req;

  try {
    const foundTask = await Task.findByPk(taskId);
    foundTask.isDone = !isDone;

    const [updatedTaskCount, [updatedTask]] = await Task.update(
      foundTask.get(),
      {
        where: { id: taskId },
        returning: true
      }
    );

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

  try {
    const deletedTaskCount = await Task.destroy({ where: { id: taskId } });

    if (deletedTaskCount) {
      return res.status(204).send();
    }
    next(createError(404, 'Not Found'));
  } catch (error) {
    next(error);
  }
};
