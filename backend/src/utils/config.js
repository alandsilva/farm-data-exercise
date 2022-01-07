const PORT = process.env.PORT || 3001;
const MONGO_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL || undefined
    : process.env.MONGO_URL || undefined;

module.exports = {
  MONGO_URL,
  PORT,
};
