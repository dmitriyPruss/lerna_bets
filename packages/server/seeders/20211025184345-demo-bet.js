'use strict';
const betData = require('../initialDbData/bets.json');

const bets = betData.map(bet => ({
  ...bet,
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bets', bets, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bets', null, {});
  }
};
