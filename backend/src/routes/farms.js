const express = require('express');
const router = express.Router();

const farmService = require('../services/farmService');

/* GETS ALL FARMS INFO*/
router.get('/', async (req, res) => {
  const result = await farmService.getInfo();

  res.send(result);
});

/* GETS FARMS THAT MATCH QUERY */
router.get('/query', async (req, res) => {
  const result = await farmService.getEntries(req.query);
  if (!result.found.length) {
    res.send('No matches');
  } else {
    res.send(result);
  }
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
