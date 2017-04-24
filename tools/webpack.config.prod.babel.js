/* @flow */
import common from './common';
import webpack from 'webpack';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config: WebpackConfiguration = merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!sass-loader!postcss-loader',
        ),
      },
      {
        test: /\.(mp3|wav)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css', {}),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],

  output: {
    filename: '[name].[hash].js',
  },
});

export default config;
