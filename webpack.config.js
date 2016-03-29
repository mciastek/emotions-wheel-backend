'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.join(__dirname, 'web/static/js');
var publicPath = '/assets/';

var config = {
  entry: [
    './web/static/js/run'
  ],

  output: {
    path: path.join(__dirname, 'priv/static'),
    filename: 'js/app.js',
    publicPath: publicPath
  },

  devtool: 'source-map',

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      containers: srcPath + '/containers/',
      sources: srcPath + '/sources/',
      store: srcPath + '/store/',
      reducers: srcPath + '/reducers/',
      css: srcPath + '/../css/',
      images: srcPath + '/../assets/images/',
      utils: srcPath + '/utils/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
    }
  },

  plugins: [
    new ExtractTextPlugin('css/app.css')
  ],

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      include: srcPath,
      loader: 'eslint-loader'
    }],

    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'web/static/js')
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    }, {
      test: /\.styl/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
    }, {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  postcss: function() {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  );
}

module.exports = config;