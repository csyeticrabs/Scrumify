const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },

  module: {
    rules: [
      {
        test: /.jsx|js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,

    static: {
      // match the output path
      directory: path.resolve(__dirname, 'dist'),
      // match the output 'publicPath'
      publicPath: '/',
    },

    headers: { 'Access-Control-Allow-Origin': '*' },

    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
};