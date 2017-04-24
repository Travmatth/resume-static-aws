/* @flow */
import common from './common';
import webpack from 'webpack';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config: WebpackConfiguration = merge(common, {
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
    new ExtractTextPlugin('[name].[hash].css', {}),
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
