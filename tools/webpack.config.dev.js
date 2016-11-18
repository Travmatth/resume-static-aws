var common = require('./common')
var webpack = require('webpack')
var validate = require('webpack-validator')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = validate({
  devtool: 'cheap-module-eval-source-map',

  entry: {
    index: common.PATHS.entry,
  },

  output: {
    filename: '[name].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },

  resolve: {
    extensions: common.PATHS.resolveExtensions
  },

  module: {
    loaders: []
  },

  plugins: [
    // Write out stats file to build directory.
    new StatsWriterPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
  ],
})