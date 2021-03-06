const express = require('express');
const app = express();
const path = require('path');

const logsRouter = require('./routes/logsRouter.js');
const indexPatternsRouter = require('./routes/indexPatternsRouter.js');
const alertsRouter = require('./routes/alertsRouter');
// parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// send bundle
app.use('/build', express.static(path.join(__dirname, '../build/')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('/logs', logsRouter);
app.use('/indexpatterns', indexPatternsRouter);
app.use('/alerts', alertsRouter);

//catch all route handler, handles request to an unknown route
app.use((req, res) =>
  res.status(404).send('The page you are looking for not exist.')
);

//gloabal error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .send('Unknown error in middleware. See server logs for more information.');
});

app.listen(3068, () => console.log('Listening on port 3068'));
