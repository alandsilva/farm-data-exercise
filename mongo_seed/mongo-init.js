/*  This script runs after mongo-import.sh 
    Removes all invalid data from database
*/
print(
  'START database cleanup #################################################################'
);

const filterpH = {
  sensorType: 'pH',
  $or: [{ value: { $gt: 14 } }, { value: { $lt: 0 } }],
};

const filterSensorType = {
  sensorType: { $nin: ['pH', 'rainFall', 'temperature'] },
};

const filterTemperature = {
  sensorType: 'temperature',
  $or: [{ value: { $gt: 100 } }, { value: { $lt: -50 } }],
};

const filterRainFall = {
  sensorType: 'rainFall',
  $or: [{ value: { $gt: 500 } }, { value: { $lt: 0 } }],
};

const filterValue = {
  value: { $type: 'string' },
};

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.farms.updateMany({}, [{ $set: { datetime: new Date('$datetime') } }]);
db.farms.deleteMany({
  $or: [
    filterpH,
    filterValue,
    filterRainFall,
    filterTemperature,
    filterSensorType,
  ],
});

print(
  'END database cleanup #################################################################'
);
