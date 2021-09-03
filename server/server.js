const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/build/client/index.js/',
  express.static(path.join(__dirname, '../build/client/index.js'))
);
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000);
