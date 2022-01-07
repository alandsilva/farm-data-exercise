const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(path.join(__dirname, '../temp/'), { recursive: true });
    cb(null, path.join(__dirname, '../temp/'));
  },
  filename: (_req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const csvFilter = (_req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: csvFilter,
});

module.exports = upload;
