/* @flow */

import common from './common';
import { multiCompiler } from './directory';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const configs = multiCompiler(page => ({
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new PurifyCSSPlugin({
      paths: [`src/${page}.pug`],
      minimize: true,
      verbose: true,
    }),
    new BabiliPlugin(),
    new CompressionPlugin(),
  ],

  output: {
    filename: '[name].[hash].js',
  },
}));

export default merge.multiple(common, configs);
