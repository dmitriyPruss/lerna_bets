const { Router } = require('express');
const { betController } = require('../controllers');
const { paginate, validate } = require('../middleware');

const betRouter = Router();

betRouter
  .route('/')
  .get(paginate.paginateBets, betController.getBets)
  .post(validate.validateNewBet, betController.createBet);

betRouter
  .route('/:betId')
  .patch(validate.validateChangedBet, betController.changeBet)
  .delete(betController.deleteBet);

module.exports = betRouter;
