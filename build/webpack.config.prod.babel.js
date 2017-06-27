/* @flow */

import common from './common';
import { multiCompiler } from './directory';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import BabiliPlugin from 'babili-webpack-plugin';

const configs = multiCompiler(page => ({
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
