const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'public', 'dist');

const config = {
  entry: `${SRC_DIR}/index.jsx`,
  target: 'web',
  output: {
    filename: 'client.bundle.js',
    path: DIST_DIR,
    sourceMapFilename: '[name].js.map'
  }
};


module.exports = merge(baseConfig, config);
