/* @flow */
'use strict';

import common from './common';
import pageConfigs from './directory';
import webpack from 'webpack';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const newConfigs = pageConfigs(page => {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
          }),
        },
        {
          test: /\.(mp3|wav)$/,
          exclude: /node_modules/,
          use: 'file-loader',
        },
      ],
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.optimize.UglifyJsPlugin(),
    ],

    output: {
      filename: '[name].[hash].js',
    },
  };
});

export default merge.multiple(common, newConfigs);
