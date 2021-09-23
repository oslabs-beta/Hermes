const express = require('express');
const indexPatternsController = require('../controllers/indexPatternsController.js');
const router = express.Router();

router.get('/', indexPatternsController.getIndexPatterns, (req, res) => {
  return res.status(200).json(res.locals.indexPatterns);
});

router.post(
  '/',
  indexPatternsController.getIndexPatterns,
  indexPatternsController.setIndexPattern,
  (req, res) => {
    return res.status(200).json(res.locals.indexPatterns);
  }
);

router.delete(
  '/',
  indexPatternsController.getIndexPatterns,
  indexPatternsController.deleteIndexPattern,
  (req, res) => {
    return res.status(200).json(res.locals.indexPatterns);
  }
);
module.exports = router;
