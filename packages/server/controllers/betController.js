const _ = require('lodash');
const { Bet } = require('../models');
const { PAGINATION } = require('../constants');
const { createErr404 } = require('../errorCreators');

module.exports.getBets = async (req, res, next) => {
  const {
    pagination: { limit, offset },
    emptyQuery
  } = req;

  try {
    if (emptyQuery) {
      const foundRenderBets = await Bet.findAll({
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        limit: PAGINATION.LIMIT_RENDER_DEFAULT,
        offset: PAGINATION.OFFSET_DEFAULT,
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).send({ data: foundRenderBets.reverse() });
    }

    const foundBets = await Bet.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit,
      offset
    });

    res.status(200).send({ data: foundBets });
  } catch (error) {
    next(error);
  }
};

module.exports.createBet = async (req, res, next) => {
  const { body, ip } = req;
  const {
    app: {
      locals: { newBetInstance }
    }
  } = req;

  console.log(`body`, body);

  console.log(`IP`, ip);

  const io = req.app.locals.io;

  try {
    if (!_.isEmpty(req.body)) {
      body.ip = ip;
      const newBetData = await Bet.create(body);
      const newBet = _.omit(newBetData.get(), ['createdAt', 'updatedAt']);
      console.log(`newBet`, newBet);

      return res.status(201).send({ data: newBet });
    }

    newBetInstance.ip = ip;
    const createdBet = await Bet.create(newBetInstance);
    const sendedBet = _.omit(createdBet.get(), ['updatedAt']);
    return io.emit('NEW_BET', sendedBet);
  } catch (error) {
    next(error);
  }
};

module.exports.changeBet = async (req, res, next) => {
  const {
    params: { betId },
    body: { isWinned }
  } = req;

  try {
    const foundBet = await Bet.findByPk(betId);
    foundBet.isWinned = !isWinned;

    const [updatedBetCount, [updatedBet]] = await Bet.update(foundBet.get(), {
      where: { id: betId },
      returning: true
    });

    if (updatedBetCount > 0) {
      const changedBet = _.omit(updatedBet.get(), ['createdAt', 'updatedAt']);
      return res.status(200).send({ data: changedBet });
    }
    next(createErr404);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteBet = async (req, res, next) => {
  const {
    params: { betId }
  } = req;

  try {
    const deletedBetCount = await Bet.destroy({ where: { id: betId } });

    if (deletedBetCount) {
      return res.status(204).send();
    }
    next(createErr404);
  } catch (error) {
    next(error);
  }
};
