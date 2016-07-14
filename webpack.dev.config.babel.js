const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * The webpack configuration for development.
 *
 * @type {Object}
 */
const configuration = {
  devtool: 'cheap-module-eval-source-map', // Enable line-based sourcemaps
  entry: {
    main: [
      'babel-polyfill', // Install babel-friendly environment
      'isomorphic-fetch', // Polyfill fetch
      './src/client.js' // Include our client source code
    ]
  },
  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel!eslint?failOnWarning=false&failOnError=false', test: /\.js$/ },
      { loader: 'style!css', test: /\.css$/ },
      { loader: 'json', test: /\.json/ },
      { loader: 'raw', test: /\.html/ },
      { loader: 'style!raw!sass', test: /\.scss/ },
      { loader: 'file?name=[name]-[md5:hash].[ext]', test: /\.gif$|\.jpg$|\.jpeg$|\.png|\.eot$|\.svg$|\.otf$|\.ttf$|\.woff$|\.woff2$|\.pdf$/ }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  output: {
    chunkFilename: '[name]-[hash].js',
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './dev/version.json', to: 'version.json' },
      { from: './dev/config.json', to: 'config.json' }
    ]),
    // Define constants used throughout the codebase
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Protects against multiple React installs when npm linking
    new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
    // Enable hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // Optimization: remove duplicates
    new webpack.optimize.DedupePlugin(),
    // Optimization: aggressive merging
    new webpack.optimize.AggressiveMergingPlugin(),
    // Optimization: assign the module and chunk ids by occurrence count
    new webpack.optimize.OccurenceOrderPlugin(),
    // Generate index.html
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      inject: 'body',
      minify: {},
      template: './webpackHtmlTemplate.html'
    })
  ],
  progress: false
};

module.exports = configuration;
