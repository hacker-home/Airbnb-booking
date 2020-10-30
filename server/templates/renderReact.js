import App from '../../client/src/App.jsx';
const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const ReactDOMServer = require('react-dom/server');
import React from 'react';
const layout = require('./layout.js');

const render = () => {
  fs.readFile(path.resolve("./public/dist/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Some error happened");
    }
    // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    const body = ReactDOMServer.renderToString(<App />);
    console.log('testing')
    res.send(
      layout('Test', `${body}`)
    );
  })
}
module.exports = render;
