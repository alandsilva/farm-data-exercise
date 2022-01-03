const mongoose = require('mongoose');
const Farm = require('./models/Farm');
const { MONGO_URL } = require('../utils/config');

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database');
    })
    .catch(() => {
      console.error('Failed to connect to database');
    });

module.exports = {
  Farm,
};
