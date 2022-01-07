const fs = require('fs');
const { parse } = require('csv-parse');
const removeFile = require('./fileRemover');
const { ValueError } = require('./validators');

const processFile = async (pathName) => {
  const records = [];
  const parser = fs
    .createReadStream(pathName, {
      encoding: 'utf-8',
    })
    .pipe(
      parse({
        columns: (header) => {
          const validHeaders = ['location', 'datetime', 'sensorType', 'value'];
          if (JSON.stringify(header) !== JSON.stringify(validHeaders)) {
            removeFile(pathName);
            throw new ValueError(
              `Incorrect headers in csv file.\n Valid headers are ${validHeaders}`
            );
          } else {
            return header;
          }
        },
      })
    );
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
};

module.exports = processFile;
