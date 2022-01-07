const logger = require('./logger');

const requestLogger = (req, _res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _req, res, next) => {
  if (error.name === 'ValueError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'DateError') {
    return res.status(400).json({ error: error.message });
  }

  // logger.error('error', error.message);

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
