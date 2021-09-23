const fs = require('fs');
const path = require('path');
const indexPatternsController = {};
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const storage = path.resolve(__dirname, '../../storage/index_patterns.json');

indexPatternsController.getIndexPatterns = (req, res, next) => {
  res.locals.indexPatterns = JSON.parse(fs.readFileSync(storage));
  next();
};

indexPatternsController.setIndexPattern = (req, res, next) => {
  if (
    !res.locals.indexPatterns.includes(req.body.indexPattern) &&
    req.body.indexPattern
  ) {
    res.locals.indexPatterns.push(req.body.indexPattern);
    fs.writeFileSync(storage, JSON.stringify(res.locals.indexPatterns));
    next();
  } else {
    next();
  }
};

indexPatternsController.deleteIndexPattern = (req, res, next) => {
  if (res.locals.indexPatterns.includes(req.body.indexPattern)) {
    const arrIndex = res.locals.indexPatterns.indexOf(req.body.indexPattern);
    res.locals.indexPatterns.splice(arrIndex, 1);
    fs.writeFileSync(storage, JSON.stringify(res.locals.indexPatterns));
    next();
  } else {
    next();
  }
};

module.exports = indexPatternsController;
