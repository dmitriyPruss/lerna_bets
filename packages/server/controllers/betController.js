const _ = require('lodash');
const { Bet } = require('../models');
const { PAGINATION } = require('../constants');
const { createErr404 } = require('../errorCreators');

/***
 *  Две ветки отработки getBets:
 *  1. Для httpRequests с пагинацией через req.ruery
 *  2. Для рендеринга на реакте
 */
module.exports.getBets = async (req, res, next) => {
  const {
    pagination: { limit, offset },
    emptyQuery
  } = req;

  try {
    if (emptyQuery) {
      const foundRenderBets = await Bet.findAll({
        raw: true,
        attributes: ['id', 'team', 'betValue', 'isWinned', 'createdAt'],
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

/***
 *  Две ветки отработки createBet:
 *  1. Для httpRequests с данными req.body
 *  2. Для рендеринга на реакте (пустой обьект req.body) - с использованием socket.io
 */
module.exports.createBet = async (req, res, next) => {
  const { body, ip } = req;
  const {
    app: {
      locals: { io, newBetInstance }
    }
  } = req;

  try {
    if (!_.isEmpty(req.body)) {
      body.ip = ip;
      const newBetData = await Bet.create(body);
      const newBet = _.omit(newBetData.get(), ['createdAt', 'updatedAt']);

      return res.status(201).send({ data: newBet });
    }

    newBetInstance.ip = ip;
    const createdBet = await Bet.create(newBetInstance);
    const sendedBet = _.pick(createdBet.get(), [
      'id',
      'team',
      'betValue',
      'isWinned',
      'createdAt'
    ]);

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
      const changedBet = _.omit(updatedBet.get(), ['ip', 'userAgent']);
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
