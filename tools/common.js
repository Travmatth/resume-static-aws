/* @flow */
'use strict';

// import webpack from 'webpack'
import webpack from 'webpack';
import pages from './directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

const root = process.cwd();
const path = require('path');

//$TODO: impl gist.github.com/addyosmani/58e00d3eb2bd6e1da316ed7c1a8e83d0
//$TODO: impl github.com/johnagan/clean-webpack-plugin
const common: WebpackConfiguration = {
  output: {
    publicPath: '/',
    path: path.resolve(root, 'dist'),
  },

  entry: Object.assign(
    {},
    {
      vendor: [
        'babel-polyfill',
        /*'virtual-dom'*/
      ],
    },
    {
      index: [
        path.resolve(root, './src/index.js'),
        path.resolve(root, 'src/index.scss'),
      ],
    },
    ...pages.map(page => ({
      [`${page}/index`]: [
        path.resolve(root, `./src/${page}/index.js`),
        path.resolve(root, `src/${page}/index.scss`),
      ],
    })),
  ),

  resolve: {
    extensions: ['.js', '.scss', '.pegjs'],
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
    // Ignore flow files in local directories
    // new webpack.IgnorePlugin(/\.flow$/),
    // Write out stats file to build directory.
    new StatsWriterPlugin(),
    // generate index page
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['index'],
      template: 'src/index.pug',
      title: 'index',
      filename: 'index.html',
    }),
    // generate project pages
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        inject: false,
        chunks: [`${page}/index`],
        template: `src/${page}/index.pug`,
        title: `${page}`,
        filename: `${page}/index.html`,
      });
    }),
  ],
};

export default common;
