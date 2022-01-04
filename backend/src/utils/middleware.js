const logger = require('./logger');
const { parseValue, parseDate } = require('./validators');

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

const processQuery = (req, _res, next) => {
  const phQuery = [];
  const tempQuery = [];
  const rainQuery = [];
  const dateQuery = [];
  if (!req.query) {
    next();
  }
  const {
    phMax,
    phMin,
    tempMin,
    tempMax,
    rainMin,
    rainMax,
    dateStart,
    dateEnd,
    page,
  } = req.query;

  if (phMax) {
    const value = parseValue(phMax, 'pH');
    phQuery.push({
      sensorType: 'pH',
      value: { $lte: value },
    });
  }
  if (phMin) {
    const value = parseValue(phMin, 'pH');
    phQuery.push({
      sensorType: 'pH',
      value: { $gte: value },
    });
  }

  if (tempMax) {
    const value = parseValue(tempMax, 'temperature');
    tempQuery.push({
      sensorType: 'temperature',
      value: { $lte: value },
    });
  }
  if (tempMin) {
    const value = parseValue(tempMin, 'temperature');
    tempQuery.push({
      sensorType: 'temperature',
      value: { $gte: value },
    });
  }

  if (rainMax) {
    const value = parseValue(rainMax, 'rainFall');
    rainQuery.push({
      sensorType: 'rainFall',
      value: { $lte: value },
    });
  }
  if (rainMin) {
    const value = parseValue(rainMin, 'rainFall');
    rainQuery.push({
      sensorType: 'rainFall',
      value: { $gte: value },
    });
  }
  if (dateStart) {
    const date = parseDate(dateStart);
    dateQuery.push({
      datetime: { $gt: new Date(date) },
    });
  }
  if (dateEnd) {
    const date = parseDate(dateEnd);
    dateQuery.push({
      datetime: { $lt: new Date(date) },
    });
  }

  const andArray = [];
  if (phQuery.length > 0) andArray.push({ $and: phQuery });
  if (tempQuery.length > 0) andArray.push({ $and: tempQuery });
  if (rainQuery.length > 0) andArray.push({ $and: rainQuery });
  if (dateQuery.length > 0) andArray.push({ $and: dateQuery });

  console.log(phQuery);
  console.log(tempQuery);
  console.log(rainQuery);
  console.log(dateQuery);
  console.log(andArray);

  req.customQuery = {};
  req.page = 1;
  if (andArray.length > 0) req.customQuery = { $or: andArray };

  if (page) {
    req.page = Number(page);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  processQuery,
  errorHandler,
};
