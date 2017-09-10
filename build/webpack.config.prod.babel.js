/* @flow */

import common from './common';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import { compile } from './directory';
import PurifyCSSPlugin from 'purifycss-webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const configs = compile(page => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new PurifyCSSPlugin({
      paths: [`src/${page}.pug`],
      minimize: true,
      verbose: true,
    }),
    new BabiliPlugin(),
  ],

  output: {
    filename: '[name].[hash].js',
  },
}));

export default merge.multiple(common, configs);
