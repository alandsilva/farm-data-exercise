const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: String,
  datetime: Date,
  sensorType: String,
  value: Number,
});

const model = mongoose.model('Farm', schema);

module.exports = model;
