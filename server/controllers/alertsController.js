const fs = require('fs');
const path = require('path');
const alertsController = {};
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const storage = path.resolve(__dirname, '../../storage/alerts.json');

alertsController.getAlerts = (req, res, next) => {
  res.locals.alerts = JSON.parse(fs.readFileSync(storage));
  next();
};

alertsController.setAlert = (req, res, next) => {
  const stringifiedAlert = JSON.stringify(req.body.alert);
  if (!res.locals.alerts.includes(stringifiedAlert) && stringifiedAlert) {
    res.locals.alerts.push(stringifiedAlert);
    fs.writeFileSync(storage, JSON.stringify(res.locals.alerts));
    next();
  } else {
    next();
  }
};

alertsController.deleteAlert = (req, res, next) => {
  const stringifiedAlert = JSON.stringify(req.body.alert);
  if (res.locals.alerts.includes(stringifiedAlert)) {
    const arrIndex = res.locals.alerts.indexOf(stringifiedAlert);
    res.locals.alerts.splice(arrIndex, 1);
    fs.writeFileSync(storage, JSON.stringify(res.locals.alerts));
    next();
  } else {
    next();
  }
};

module.exports = alertsController;
