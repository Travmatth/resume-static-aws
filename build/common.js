/* @flow */

import path from 'path';
import webpack from 'webpack';
import { multiCompiler } from './directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const root = process.cwd();

const common = multiCompiler(page => ({
  output: {
    publicPath: '/',
    path: path.resolve(root, 'dist'),
  },

  entry: {
    [page]: [
      path.resolve(root, `./src/${page}.js`),
      path.resolve(root, `src/${page}.scss`),
    ],
  },

  resolve: {
    extensions: ['.js', '.scss', '.pegjs', '.txt'],
    alias: {
      common: path.resolve(root, 'src', 'common'),
      protected: path.resolve(root, 'src', 'common', 'protected'),
      tests: path.resolve(root, 'tests'),
    },
  },

  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: 'pug-loader',
      },
      {
        test: /\.pegjs$/,
        exclude: /node_modules/,
        use: 'pegjs-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin('dist'),
    new StatsWriterPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: [page],
      template: `src/${page}.pug`,
      title: page,
      filename: `${page}.html`,
    }),
  ],
}));

export default common;
