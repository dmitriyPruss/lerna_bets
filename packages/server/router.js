const { Router } = require('express');
const todoRouter = require('./routes/todoRouter');

const router = Router();

router.use('/todos', todoRouter);

module.exports = router;
