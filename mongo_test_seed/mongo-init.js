/*
 */
print(
  'START #################################################################'
);

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_test_database',
    },
  ],
});

db.createCollection('farms');

db.farms.insertOne({ text: 'Write code', done: true });
db.farms.insertOne({ text: 'Learn about containers', done: false });

print('END #################################################################');
