
//const newrelic = require('newrelic');
const expressStaticGzip = require('express-static-gzip');
const renderReact = require('./templates/renderReact.js');
const App = require('../client/src/App.jsx').default;
const layout = require('./templates/layout.js');
const fs = require('fs');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes.js');
const compression = require('compression');

const api = 'http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com/bundle.js'

const db = require('../db/index.js');
//const morgan = require('morgan');
const app = express();

const PORT = 80;
const React = require('react');
const ReactDOMServer = require('react-dom/server');

app.use(morgan('dev'));

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.get('/bundle.js', expressStaticGzip(__dirname + '../public/dist', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
     res.setHeader("Cache-Control", "public/dist, max-age=31536000");
  },
}));

// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.use('^/$', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../public/dist/index.html'), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("could not render from server");
    }
    console.log('testing from server');
    const body = ReactDOMServer.renderToString(<App />);
    const script = `<script type="text/javascript" src="${api}"></script>`;
    return res.send(
      data.replace(
        `<div class="body" id="booking"></div>`,
        `<div class="body" id="booking">${ReactDOMServer.renderToString(<App />)}</div>
         <script type="text/javascript" src="${api}"></script>`
      )
    );
  });
});

app.use(express.static(path.join(__dirname, '../public/dist')));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
