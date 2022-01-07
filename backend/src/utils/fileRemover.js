const fs = require('fs');
const removeFile = (pathName) => {
  try {
    fs.unlinkSync(pathName);
  } catch (err) {
    throw new Error(`Not such file to be deleted at ${pathName}`);
  }
};

module.exports = removeFile;
