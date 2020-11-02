import React from 'react';
import App from '../../client/src/App.jsx';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';

export default (req) => {
  const css = new Set()
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>
    </StyleContext.Provider>
  );
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Server Document</title>
    <meta charset="UTF-8">
    <script src="client.bundle.js" defer>
    </script>
    <style>${[...css].join('')}
    </style>
   </head>
    <body>
      <div class="body" id="booking">${content}</div>
    </body>
  </html>
  `;
};

