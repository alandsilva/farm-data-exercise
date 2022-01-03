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

const processQuery = (req, _res, next) => {
  const phQuery = [];
  const tempQuery = [];
  const rainQuery = [];
  if (!req.query) {
    next();
  }
  const { phMax, phMin, tempMin, tempMax, rainMin, rainMax } = req.query;

  if (phMax)
    phQuery.push({
      sensorType: 'pH',
      value: { $lte: Number(phMax) },
    });
  if (phMin)
    phQuery.push({
      sensorType: 'pH',
      value: { $gte: Number(phMin) },
    });

  if (tempMax)
    tempQuery.push({
      sensorType: 'temperature',
      value: { $lte: Number(tempMax) },
    });
  if (tempMin)
    tempQuery.push({
      sensorType: 'temperature',
      value: { $gte: Number(tempMin) },
    });

  if (rainMax)
    rainQuery.push({
      sensorType: 'rainFall',
      value: { $lte: Number(rainMax) },
    });
  if (rainMin)
    rainQuery.push({
      sensorType: 'rainFall',
      value: { $gte: Number(rainMin) },
    });

  const andArray = [];
  if (phQuery.length > 0) andArray.push({ $and: phQuery });
  if (tempQuery.length > 0) andArray.push({ $and: tempQuery });
  if (rainQuery.length > 0) andArray.push({ $and: rainQuery });

  console.log(phQuery);
  console.log(tempQuery);
  console.log(rainQuery);
  console.log(andArray);

  req.customQuery = {};
  if (andArray.length > 0) req.customQuery = { $or: andArray };

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  processQuery,
};
