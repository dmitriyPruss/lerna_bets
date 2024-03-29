const express = require('express');
const cors = require('cors');
const router = require('./router');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(
  errorHandlers.validateErrHandler,
  errorHandlers.sequelizeErrHandler,
  errorHandlers.commonErrHandler
);

module.exports = app;
