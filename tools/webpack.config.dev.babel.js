/* @flow */
'use strict';

import webpack from 'webpack';
import common from './common';
import merge from 'webpack-merge';
import pageConfigs from './directory';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin';

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

    devServer: {
      stats: {
        chunks: false,
      },
    },

    plugins: [
      new FlowStatusWebpackPlugin({
        onSuccess: stdout => console.log(stdout),
        onError: stdout => console.log(stdout),
      }),
      new ExtractTextPlugin('[name].css'),
    ],

    output: {
      filename: '[name].js',
    },
  };
});

export default merge.multiple(common, newConfigs);
