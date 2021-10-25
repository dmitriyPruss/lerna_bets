const { Router } = require('express');
const betRouter = require('./routes/betRouter');

const router = Router();

router.use('/bets', betRouter);

module.exports = router;
