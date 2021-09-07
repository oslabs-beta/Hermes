const express = require('express');
const logsController = require('../controllers/logsController.js');
const router = express.Router();

router.get('/logsByIndex', logsController.getLogsByIndex, (req, res) => {
  return res.status(200).contentType('application/json').json(res.locals.logs);
});

module.exports = router;
