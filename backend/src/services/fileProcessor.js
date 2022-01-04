const fs = require('fs');
const { parse } = require('csv-parse');

const processFile = async (pathName) => {
  const records = [];
  const parser = fs
    .createReadStream(pathName, {
      encoding: 'utf-8',
    })
    .pipe(
      parse({
        columns: true,
      })
    );
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
};

module.exports = processFile;
