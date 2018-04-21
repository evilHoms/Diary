require("babel-polyfill");
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const extractPluginScss = new extractTextPlugin({
  filename: 'main.css'
});

const extractPluginCss = new extractTextPlugin({
  filename: 'style.css'
});

const distFolder = 'public';

module.exports = {
  entry: ['babel-polyfill', './views/client.jsx'],
  output: {
    path: path.resolve(__dirname, distFolder),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-decorators-legacy']
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-decorators-legacy']
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        use: extractPluginScss.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractPluginCss.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: './public'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: path.resolve(__dirname, 'views/index.html')
      }
    ]
  },
  plugins: [
    extractPluginScss,
    extractPluginCss,
    new htmlWebpackPlugin({
      template: 'views/index.html'
    }),
    new cleanWebpackPlugin([distFolder])
  ],
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};