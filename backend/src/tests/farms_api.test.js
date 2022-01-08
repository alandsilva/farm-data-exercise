const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const path = require('path');

const { Farm } = require('../mongo');

describe('when there are initially some farms saved', () => {
  beforeEach(async () => {
    await Farm.deleteMany({});
    const noteObjects = helper.initialFarms.map((farm) => new Farm(farm));
    const promiseArray = noteObjects.map((note) => note.save());
    await Promise.all(promiseArray);
  });

  describe('GET /farms/info - get info on all farms', () => {
    test('returns json', async () => {
      await api
        .get('/farms/info')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('gives the correct number of items', async () => {
      const response = await api.get('/farms/info');
      expect(response.body.count).toBe(helper.initialFarms.length);
    });
  });
  describe('GET /farms - get farms based on query', () => {
    test('returns json', async () => {
      await api
        .get('/farms/info')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('fiters correctly by date', async () => {
      const response = await api.get('/farms/?dateMin=2021');
      expect(response.body.count).toBe(3);
    });
    test('fiters correctly by pH', async () => {
      const response = await api.get('/farms/?phMin=5&phMax=6');
      expect(response.body.count).toBe(2);
    });
    test('fiters correctly by temperature', async () => {
      const response = await api.get('/farms/?tempMin=-15&tempMax=-10');
      expect(response.body.count).toBe(1);
    });
    test('fiters correctly by rainFall', async () => {
      const response = await api.get('/farms/?rainMin=2');
      expect(response.body.count).toBe(2);
    });
    test('return count of 0 when there are no matches', async () => {
      const response = await api.get('/farms/?dateMin=2023');
      expect(response.body.count).toBe(0);
    });
    test('fails with code 400 if query is out of bounds', async () => {
      await api.get('/farms/?phMin=-1').expect(400);
    });
  });
  describe('POST /farms - create new farm', () => {
    test('succeeds with valid data', async () => {
      const newFarm = {
        location: 'Oulu Farms',
        datetime: '2022-01-08T11:19:44.018Z',
        sensorType: 'temperature',
        value: -20,
      };

      await api
        .post('/farms')
        .send(newFarm)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const farmsAtEnd = await helper.farmsInDb();
      expect(farmsAtEnd.length).toBe(helper.initialFarms.length + 1);

      const locations = farmsAtEnd.map((n) => n.location);
      expect(locations).toContain('Oulu Farms');
    });
    test('fails with status code 400 if data invalid', async () => {
      const newFarm = {
        location: 'Oulu Farms',
        datetime: '2022-01-08T11:19:44.018Z',
        sensorType: 'Temperature', // should be 'temperature'
        value: -20,
      };

      await api.post('/farms').send(newFarm).expect(400);

      const notesAtEnd = await helper.farmsInDb();

      expect(notesAtEnd.length).toBe(helper.initialFarms.length);
    });
  });
  describe('POST /farms/csv - upload csv file', () => {
    const folderPath = path.join(__dirname, '/testFiles');
    test('succeeds with valid header and data', async () => {
      await api
        .post('/farms/csv')
        .attach('farm', `${folderPath}/all_valid.csv`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const farmsAtEnd = await helper.farmsInDb();
      expect(farmsAtEnd.length).toBe(helper.initialFarms.length + 3);

      const locations = farmsAtEnd.map((n) => n.location);
      expect(locations).toContain('Great Farm');
    });
    test('returns details on succesful count and unsuccesful count and lines', async () => {
      const response = await api
        .post('/farms/csv')
        .attach('farm', `${folderPath}/some_valid.csv`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.successful).toBe(1);
      expect(response.body.unsuccessful.count).toBe(2);
      expect(response.body.unsuccessful.rows).toContain(3);
      expect(response.body.unsuccessful.rows).toContain(4);
    });
    test('fails with status code 400 if header is incorrect', async () => {
      await api
        .post('/farms/csv')
        .attach('farm', `${folderPath}/wrong_header.csv`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
