const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { Farm } = require('../mongo');
const initialFarms = [
  {
    location: 'Kamppi farms Inc',
    datetime: '2022-01-07',
    sensorType: 'pH',
    value: 7.5,
  },
  {
    location: 'Kamppi farms Inc',
    datetime: '2022-01-06',
    sensorType: 'temperature',
    value: -9.6,
  },
];
beforeEach(async () => {
  await Farm.deleteMany({});
  let noteObject = new Farm(initialFarms[0]);
  await noteObject.save();
  noteObject = new Farm(initialFarms[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/farms/info')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
