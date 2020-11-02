const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.(css|less)$/,
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false,
            sourceMap: true,
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
        }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
};