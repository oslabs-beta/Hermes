const logsController = {};

logsController.getLogsByIndex = async (req, res, next) => {
  const index = req.query.index;
  try {
    const logs = await fetch(`http://localhost:9200/${index}/_search`);
    res.locals.logs = logs;
    return next();
  } catch (error) {
    return next(
      'Error in logsController.getLogsByIndex: ' + JSON.stringify(error)
    );
  }
};

module.exports = logsController;
