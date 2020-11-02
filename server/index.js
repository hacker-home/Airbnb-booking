
import '@babel/polyfill';
//const newrelic = require('newrelic');
// const expressStaticGzip = require('express-static-gzip');

import express from 'express';
import renderReact from './templates/renderReact.js';
import App from '../client/src/App.jsx';
import router from './routes/routes.js';

const path = require('path');
const cors = require('cors');
const compression = require('compression');

const api = 'http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com/bundle.js'

const database = require('../database');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));
app.get('*', (req, res) => {
  res.send(renderReact(req));
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

// production config:

// app.use(compression());
// app.get('/bundle.js', expressStaticGzip(__dirname + '../public/dist', {
//   enableBrotli: true,
//   orderPreference: ['br', 'gz'],
//   setHeaders: function (res, path) {
//      res.setHeader("Cache-Control", "public/dist, max-age=31536000");
//   },
// }));
// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });
