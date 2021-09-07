const express = require('express');
const logsController = require('../controllers/logsController.js');
const router = express.Router();

router.get('/logsbyindex', logsController.getLogsByIndex, (req, res) => {
  return res.status(200).json(res.locals.logs);
});
router.get('/esindices', logsController.getEsIndeces, (req, res) => {
  return res.status(200).json(res.locals.indices);
});

module.exports = router;
