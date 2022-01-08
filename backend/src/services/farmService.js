const { Farm } = require('../mongo');
const queryBuilder = require('./mongoQueryBuilder');
const processFile = require('../utils/fileProcessor');
const { isFarmEntry } = require('../utils/validators');
const removeFile = require('../utils/fileRemover');

const getInfo = async () => {
  const results = await Farm.aggregate([
    {
      $facet: {
        info: [{ $count: 'count' }],
        sensors: [
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

  const formatedResult = {
    count: results[0].info[0].count,
    ...results[0],
  };
  delete formatedResult.info;

  return formatedResult;
};

const getEntries = async (urlQuery) => {
  const { matchQuery, pageNum, limitNum } = queryBuilder(urlQuery);
  const results = await Farm.aggregate([
    {
      $facet: {
        info: [
          { $match: matchQuery },
          { $count: 'count' },
          { $addFields: { pages: { $divide: ['$count', limitNum] } } },
        ],
        sensors: [
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
        locations: [
          { $match: matchQuery },
          {
            $group: {
              _id: '$location',
              count: { $count: {} },
            },
          },
        ],
        farms: [
          { $match: matchQuery },
          { $skip: limitNum * pageNum },
          { $limit: limitNum },
        ],
      },
    },
  ]);

  const info = !results[0].info.length
    ? { count: 0, pages: 0 }
    : results[0].info[0];

  const formatedResult = {
    count: info.count,
    pages: info.pages,
    ...results[0],
  };
  delete formatedResult.info;

  return formatedResult;
};

const addEntry = async (newFarm) => {
  const result = await Farm.create(newFarm);
  return result;
};

const addCsvEntries = async (pathName) => {
  const csvDoc = await processFile(pathName);
  const validRowsArray = [];
  const invalidIndexesArray = [];

  csvDoc.forEach((row, i) => {
    if (isFarmEntry(row)) {
      validRowsArray.push(row);
    } else {
      invalidIndexesArray.push(i + 2);
      console.log(i + 2);
    }
  });

  await Farm.insertMany(validRowsArray);

  const response = {
    successful: validRowsArray.length,
    unsuccessful: {
      count: invalidIndexesArray.length,
      rows: invalidIndexesArray,
    },
  };

  // DELETES LOCAL FILE
  removeFile(pathName);

  return response;
};

module.exports = {
  getInfo,
  getEntries,
  addEntry,
  addCsvEntries,
};
