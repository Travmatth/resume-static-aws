/* @flow */

// import webpack from 'webpack'
import webpack from 'webpack';
import pageConfigs from './directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const root = process.cwd();
const path = require('path');

const common = pageConfigs(page => {
  return {
    output: {
      publicPath: '/',
      path: path.resolve(root, 'dist'),
    },

    entry: {
      [page]: [
        'babel-polyfill',
        path.resolve(root, `./src/${page}.js`),
        path.resolve(root, `src/${page}.scss`),
      ],
    },

    resolve: {
      extensions: ['.js', '.scss', '.pegjs'],
      alias: {
        common: path.resolve(root, 'src', 'common'),
        tests: path.resolve(root, 'tests'),
      },
    },

    module: {
      rules: [
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
      ],
    },

    plugins: [
      new CleanWebpackPlugin('dist'),
      // Ignore flow files in local directories
      // new webpack.IgnorePlugin(/\.flow$/),
      // Write out stats file to build directory.
      new StatsWriterPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        chunks: [page],
        template: `src/${page}.pug`,
        title: page,
        filename: `${page}.html`,
      }),
    ],
  };
});

export default common;
