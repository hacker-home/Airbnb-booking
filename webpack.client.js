const path = require('path');
const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'public', 'dist');

const config = {
  entry: `${SRC_DIR}/index.jsx`,
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    sourceMapFilename: '[name].js.map'
  },
};


module.exports = merge(baseConfig, config);
