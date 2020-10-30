module.exports = (title, body, script) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>${title}</title>
  </head>
  <body>
  <div class="body" id="booking">
  ${body}
  </div>
  </body>
  ${script}
  </html>
`