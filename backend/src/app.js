const express = require('express');
require('express-async-errors');
const app = express();
const middleware = require('./utils/middleware');

const FarmsRouter = require('./routes/farms');

app.use(express.json());
app.use(middleware.requestLogger);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/farms', FarmsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
