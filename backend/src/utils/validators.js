const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date) => {
  console.log(Date.parse);
  return Boolean(Date.parse(date));
};

const isSensor = (param) => {
  return ['pH', 'temperature', 'rainFall'].includes(param);
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

const getTip = (sensor) => {
  switch (sensor) {
    case 'pH':
      return 'between 0 and 14';
    case 'temperature':
      return 'between -50 and 100';
    case 'rainFall':
      return 'between 0 and 500';
    default:
      return '';
  }
};

class ValueError extends Error {
  constructor(message, field, tip) {
    super(message);
    this.name = 'ValueError';
    this.field = field;
    this.tip = tip;
  }
}
const parseValue = (value, sensor) => {
  const num = Number(value);
  if (!value || isNaN(num) || !isValue(value, sensor)) {
    throw new ValueError(
      `Incorrect value of sensorType ${sensor}`,
      'value',
      `must be ${getTip(sensor)}`
    );
  }
  return num;
};

const parseDate = (date) => {
  if (!date || !isString(date) || !isDate(date))
    throw new ValueError(
      'Incorrect or missing date',
      'datetime',
      'must be valid date'
    );
  return date;
};

const parseSensorType = (sensor) => {
  if (!sensor || !isString(sensor) || !isSensor(sensor))
    throw new ValueError(
      'Incorrect or missing sensor.',
      'sensorType',
      'must be one of [pH, temperature, rainFall]'
    );
  return sensor;
};

const parseLocation = (location) => {
  if (!location || !isString(location))
    throw new ValueError(
      `Incorrect or missing location: ${location}.`,
      'location',
      'Is required and must be string'
    );
  return location;
};

const toNewFarmEntry = ({ location, datetime, sensorType, value }) => {
  const newEntry = {
    location: parseLocation(location),
    datetime: parseDate(datetime),
    sensorType: parseSensorType(sensorType),
    value: parseValue(value, sensorType),
  };
  return newEntry;
};

const isFarmEntry = ({ location, datetime, sensorType, value }) => {
  const locationBool = !(!location || !isString(location));

  const datetimeBool = !(!datetime || !isString(datetime) || !isDate(datetime));

  const sensorTypeBool = !(
    !sensorType ||
    !isString(sensorType) ||
    !isSensor(sensorType)
  );

  const valueBool = !(
    !value ||
    isNaN(Number(value)) ||
    !isValue(Number(value), sensorType)
  );

  return locationBool && datetimeBool && sensorTypeBool && valueBool;
};

module.exports = {
  parseValue,
  parseDate,
  toNewFarmEntry,
  isFarmEntry,
  ValueError,
};
