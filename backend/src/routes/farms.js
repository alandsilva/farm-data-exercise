const express = require('express');
const router = express.Router();

const { Farm } = require('../mongo');
const middleware = require('../utils/middleware');

/* GETS ALL FARMS */
router.get('/', middleware.processQuery, async (req, res) => {
  const results = await Farm.aggregate([
    {
      $facet: {
        total: [{ $count: 'count' }],
        found: [{ $match: req.customQuery }, { $count: 'count' }],
        farms: [{ $match: req.customQuery }, { $skip: 5 }, { $limit: 5 }],
        stats: [
          { $match: req.customQuery },
          {
            $group: {
              _id: '$sensorType',
              max: { $max: '$value' },
              min: { $min: '$value' },
              avg: { $avg: '$value' },
            },
          },
        ],
      },
    },
  ]);
  res.send(...results);
});

/* CREATES ONE FARM */
router.post('/', (_req, res) => {
  res.send('Will create one farm entry');
});

/* CREATES FARMS FROM CSV FILE */
router.post('/csv', (_req, res) => {
  res.send('Will create farm entries from csv file');
});

module.exports = router;
