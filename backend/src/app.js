const express = require('express');
const app = express();
const middleware = require('./utils/middleware');

app.use(express.json());
app.use(middleware.requestLogger);
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(middleware.unknownEndpoint);

module.exports = app;
