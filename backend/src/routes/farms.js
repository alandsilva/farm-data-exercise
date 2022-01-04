const express = require('express');
const router = express.Router();

const farmService = require('../services/farmService');
const { toNewFarmEntry } = require('../utils/validators');

/* GETS ALL FARMS INFO*/
router.get('/', async (req, res) => {
  const result = await farmService.getInfo();

  res.send(result);
});

/* GETS FARMS THAT MATCH QUERY */
router.get('/query', async (req, res) => {
  const result = await farmService.getEntries(req.query);
  res.send(result);
});

/* CREATES ONE FARM */
router.post('/', async (req, res) => {
  const newEntry = toNewFarmEntry(req.body);
  const result = await farmService.addEntry(newEntry);
  res.send(result);
});

/* CREATES FARMS FROM CSV FILE */
router.post('/csv', (_req, res) => {
  res.send('Will create farm entries from csv file');
});

module.exports = router;
