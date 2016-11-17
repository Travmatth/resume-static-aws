var webpack = require('webpack')
var common = require('./common')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: common.PATHS.entry
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
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
  ],
}