const logsController = {};
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

logsController.getLogsByIndex = (req, res, next) => {
  const index = req.query.index;
  fetch(`http://localhost:9200/${index}/_search?q=*:8&size=10000`)
    .then((data) => data.json())
    .then((logs) => {
      res.locals.logs = logs;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return next(
        'Error in logsController.getLogsByIndex: Check server logs for more information.'
      );
    });
};

logsController.getEsIndeces = (req, res, next) => {
  fetch('http://localhost:9200/_aliases')
    .then((data) => data.json())
    .then((indices) => {
      res.locals.indices = indices;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return next(
        'Error in logsController.getESIndeces: Check server logs for more information.'
      );
    });
};

module.exports = logsController;
