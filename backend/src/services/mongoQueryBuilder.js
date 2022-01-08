const { parseValue, parseDate } = require('../utils/validators');

const queryBuilder = (urlQuery) => {
  const phQuery = [];
  const tempQuery = [];
  const rainQuery = [];
  const dateQuery = [];
  if (!urlQuery) {
    return {};
  }
  const {
    phMax,
    phMin,
    tempMin,
    tempMax,
    rainMin,
    rainMax,
    dateMin,
    dateMax,
    page,
    limit,
  } = urlQuery;

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
  if (dateMin) {
    const date = parseDate(dateMin);
    dateQuery.push({
      datetime: { $gte: new Date(date) },
    });
  }
  if (dateMax) {
    const date = parseDate(dateMax);
    dateQuery.push({
      datetime: { $lte: new Date(date) },
    });
  }

  const andArray = [];
  if (phQuery.length > 0) andArray.push({ $and: phQuery });
  if (tempQuery.length > 0) andArray.push({ $and: tempQuery });
  if (rainQuery.length > 0) andArray.push({ $and: rainQuery });

  let matchQuery = {};
  if (andArray.length > 0)
    matchQuery = { $and: [...dateQuery, { $or: andArray }] };
  else if (dateQuery.length > 0) {
    matchQuery = { $and: [...dateQuery] };
  }

  let pageNum = 0;
  if (page) {
    pageNum = Number(page);
  }

  let limitNum = 10;
  if (limit) {
    limitNum = Number(limit);
  }

  return {
    matchQuery,
    pageNum,
    limitNum,
  };
};

module.exports = queryBuilder;
