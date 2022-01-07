const express = require('express');
const router = express.Router();

const farmService = require('../services/farmService');
const { toNewFarmEntry } = require('../utils/validators');

const uploader = require('../utils/uploader');

/* GETS ALL FARMS INFO*/
router.get('/info', async (req, res) => {
  const result = await farmService.getInfo();

  res.send(result);
});

/* GETS FARMS THAT MATCH QUERY */
router.get('/', async (req, res) => {
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
router.post('/csv', uploader.single('farm'), async (req, res) => {
  if (!req.file)
    res.status(400).send({
      message: 'Please upload a CSV file',
    });
  else {
    // Upload to databse
    const result = await farmService.addCsvEntries(req.file.path);
    res.send(result);
    // Remove file from temp folder
  }
});

module.exports = router;
