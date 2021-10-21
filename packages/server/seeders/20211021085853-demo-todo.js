'use strict';
const todoData = require('./../initialDbData/todos.json');

const todos = todoData.map(todo => ({
  ...todo,
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', todos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
