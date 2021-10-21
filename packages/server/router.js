const { Router } = require('express');
const todoRouter = require('./routes/todoRouter');

const router = Router();

router.use('/tasks', todoRouter);

module.exports = router;
