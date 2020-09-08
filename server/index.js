const newrelic = require('newrelic');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes.js');
const compression = require('compression');

const db = require('../db/index.js');
// const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3333;

http.globalAgent.maxSockets = Infinity;

// app.use(morgan('dev'));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/dist')));
// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
