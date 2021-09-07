const logsController = {};
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

logsController.getLogsByIndex = (req, res, next) => {
  const index = req.query.index;
  console.log('index', index);
  fetch(`http://localhost:9200/${index}/_search`)
    .then((data) => data.json())
    .then((logs) => {
      res.locals.logs = logs;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return next(
        'Error in logsController.getLogsByIndex. Check server logs for more information.'
      );
    });
};

module.exports = logsController;
