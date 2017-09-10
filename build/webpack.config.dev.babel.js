/* @flow */

import common from './common';
import merge from 'webpack-merge';
import { compile } from './directory';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin';

const configs = compile(page => ({
  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
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
      onSuccess: message => console.log(message),
      onError: message => console.log(message),
    }),
    new ExtractTextPlugin('[name].css'),
  ],

  output: {
    filename: '[name].js',
  },
}));

export default merge.multiple(common, configs);
