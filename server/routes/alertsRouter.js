const express = require('express');
const alertsController = require('../controllers/alertsController');
const router = express.Router();

router.get('/', alertsController.getAlerts, (req, res) => {
  const alerts = res.locals.alerts.map((alert) => JSON.parse(alert));
  return res.status(200).json(alerts);
});

router.post(
  '/',
  alertsController.getAlerts,
  alertsController.setAlert,
  (req, res) => {
    const alerts = res.locals.alerts.map((alert) => JSON.parse(alert));

    return res.status(200).json(alerts);
  }
);

router.delete(
  '/',
  alertsController.getAlerts,
  alertsController.deleteAlert,
  (req, res) => {
    const alerts = res.locals.alerts.map((alert) => JSON.parse(alert));

    return res.status(200).json(alerts);
  }
);
module.exports = router;
