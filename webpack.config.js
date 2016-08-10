'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcPath = path.join(__dirname, 'web/static/js');

var config = {
  entry: [
    './web/static/js/run'
  ],

  output: {
    path: path.join(__dirname, 'priv/static'),
    filename: 'js/app.js'
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
      constants: srcPath + '/constants/',
      sources: srcPath + '/sources/',
      store: srcPath + '/store/',
      reducers: srcPath + '/reducers/',
      views: srcPath + '/views/',
      css: srcPath + '/../css/',
      images: srcPath + '/../assets/images/',
      utils: srcPath + '/utils/'
    }
  },

  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new CopyWebpackPlugin([{
      from: srcPath + '/../translations',
      to: 'translations'
    }])
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
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader?limit=8192&name=/images/[name].[ext]'
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false
    })
  );
}

module.exports = config;
