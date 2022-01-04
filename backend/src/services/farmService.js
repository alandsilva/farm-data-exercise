const { Farm } = require('../mongo');
const queryBuilder = require('./mongoQueryBuilder');

const getInfo = async () => {
  const results = await Farm.aggregate([
    {
      $facet: {
        total: [{ $count: 'count' }],
        sensorTypes: [
          {
            $group: {
              _id: '$sensorType',
              max: { $max: '$value' },
              min: { $min: '$value' },
              avg: { $avg: '$value' },
              count: { $count: {} },
            },
          },
        ],
        locations: [
          {
            $group: {
              _id: '$location',
              count: { $count: {} },
            },
          },
        ],
      },
    },
  ]);

  return results[0];
};

const getEntries = async (urlQuery) => {
  const { matchQuery, pageNum } = queryBuilder(urlQuery);
  const results = await Farm.aggregate([
    {
      $facet: {
        found: [
          { $match: matchQuery },
          { $count: 'count' },
          { $addFields: { page: { $divide: ['$count', 5] } } },
        ],
        farms: [{ $match: matchQuery }, { $skip: 5 * pageNum }, { $limit: 5 }],
        sensorTypes: [
          { $match: matchQuery },
          {
            $group: {
              _id: '$sensorType',
              max: { $max: '$value' },
              min: { $min: '$value' },
              avg: { $avg: '$value' },
              count: { $count: {} },
            },
          },
        ],
      },
    },
  ]);

  const result = {
    ...results[0],
    found: !results[0].found.length
      ? { count: 0, page: 0 }
      : results[0].found[0],
  };

  return result;
};

const addEntry = async (newFarm) => {
  const result = await Farm.insertMany(newFarm);
  return result;
};

module.exports = {
  getInfo,
  getEntries,
  addEntry,
};
