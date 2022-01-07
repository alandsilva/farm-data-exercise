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
    dateStart,
    dateEnd,
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
  if (dateStart) {
    const date = parseDate(dateStart);
    dateQuery.push({
      datetime: { $gte: new Date(date) },
    });
  }
  if (dateEnd) {
    const date = parseDate(dateEnd);
    dateQuery.push({
      datetime: { $lte: new Date(date) },
    });
  }

  const andArray = [];
  if (phQuery.length > 0) andArray.push({ $and: phQuery });
  if (tempQuery.length > 0) andArray.push({ $and: tempQuery });
  if (rainQuery.length > 0) andArray.push({ $and: rainQuery });
  // if (dateQuery.length > 0) andArray.push({ $and: dateQuery });

  console.log(phQuery);
  console.log(tempQuery);
  console.log(rainQuery);
  console.log(dateQuery);
  console.log(andArray);

  let matchQuery = {};
  if (andArray.length > 0)
    matchQuery = { $and: [...dateQuery, { $or: andArray }] };
  else if (dateQuery.length > 0) {
    matchQuery = { $and: [...dateQuery] };
  }

  let pageNum = 1;
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
