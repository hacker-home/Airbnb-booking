const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
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
          modules: true,
          importLoaders: 1,
          localIdentName: '[sha1:hash:hex:4]',
        },
      }
      ]
    },
    plugins: [
      new Dotenv()
    ]
  };