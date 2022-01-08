/* eslint-disable quotes */
const { Farm } = require('../mongo');

const initialFarms = [
  {
    location: "Noora's farm",
    datetime: '2018-12-31T22:00:00.000Z',
    sensorType: 'pH',
    value: 5.88,
  },
  {
    location: "Noora's farm",
    datetime: '2018-12-31T22:00:00.000Z',
    sensorType: 'rainFall',
    value: 3.1,
  },
  {
    location: 'PartialTech Research Farm',
    datetime: '2019-01-01T11:19:44.018Z',
    sensorType: 'temperature',
    value: -8.3,
  },
  {
    location: 'PartialTech Research Farm',
    datetime: '2019-01-02T11:19:44.018Z',
    sensorType: 'pH',
    value: 6.21,
  },
  {
    location: 'Friman Metsola collective',
    datetime: '2020-01-02T11:19:44.018Z',
    sensorType: 'rainFall',
    value: 5.9,
  },
  {
    location: 'Friman Metsola collective',
    datetime: '2020-01-02T14:55:27.420Z',
    sensorType: 'temperature',
    value: -15.4,
  },
  {
    location: 'Friman Metsola collective',
    datetime: '2021-01-02T20:56:35.163Z',
    sensorType: 'temperature',
    value: -18.9,
  },
  {
    location: "Organic Ossi's Impact That Lasts plantase",
    datetime: '2021-01-03T20:56:35.163Z',
    sensorType: 'pH',
    value: 5.87,
  },
  {
    location: "Organic Ossi's Impact That Lasts plantase",
    datetime: '2021-01-03T20:56:35.163Z',
    sensorType: 'rainFall',
    value: 1.6,
  },
  {
    location: "Organic Ossi's Impact That Lasts plantase",
    datetime: '2019-01-03T08:04:20.263Z',
    sensorType: 'temperature',
    value: -12.4,
  },
];

const farmsInDb = async () => {
  const farms = await Farm.find({});
  return farms.map((farm) => farm.toJSON());
};

module.exports = {
  initialFarms,
  farmsInDb,
};
