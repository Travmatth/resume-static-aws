/* @flow */
import webpack from 'webpack';
import common from './common';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin';

const config: WebpackConfiguration = merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!sass-loader?sourceMap',
        ),
      },
      {
        test: /\.(mp3|wav)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
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
    new ExtractTextPlugin('[name].css', {}),
  ],

  output: {
    filename: '[name].js',
  },
});

export default config;
