const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const middleware = require('./utils/middleware');

const FarmsRouter = require('./routes/farms');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/farms', FarmsRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
