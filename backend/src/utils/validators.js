const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date) => {
  console.log(Date.parse);
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line no-unused-vars
const isSensor = (param) => {
  return ['pH, temperature', 'rainFall'].includes(param);
};

const isValue = (value, sensor) => {
  switch (sensor) {
    case 'temperature':
      return value >= -50 && value <= 100;
    case 'rainFall':
      return value >= 0 && value <= 500;
    case 'pH':
      return value >= 0 && value <= 14;
    default:
      return false;
  }
};

class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValueError';
  }
}
const parseValue = (value, sensor) => {
  const num = Number(value);
  if (!value || isNaN(num) || !isValue(value, sensor)) {
    throw new ValueError(`Incorrect or missing value of ${sensor}=${value}`);
  }
  return num;
};

class DateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DateError';
  }
}
const parseDate = (date) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new DateError(`Incorrect or missing date: ${date}.`);
  }
  return new Date(date).getTime();
};

module.exports = {
  parseValue,
  parseDate,
};
