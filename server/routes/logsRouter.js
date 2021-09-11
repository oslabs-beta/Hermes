const express = require('express');
const logsController = require('../controllers/logsController.js');
const router = express.Router();

router.get('/logsbyindex', logsController.getLogsByIndex, (req, res) => {
  return res.status(200).json(res.locals.logs);
});
router.get('/esindices', logsController.getEsIndices, (req, res) => {
  return res.status(200).json(res.locals.indices);
});
router.get('/hourbuckets', logsController.getHourBuckets, (req, res) => {
  return res.status(200).json(res.locals.hourBuckets);
});
module.exports = router;
