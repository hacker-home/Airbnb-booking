
const newrelic = require('newrelic');
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

const api = 'http://localhost:3333/bundle.js'

const db = require('../db/index.js');
const morgan = require('morgan');
const app = express();

const PORT = 3333;
const React = require('React');
const ReactDOMServer = require('react-dom/server');

http.globalAgent.maxSockets = Infinity;

//app.use(morgan('dev'));

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
