/* @flow */
import webpack from 'webpack'
import common from './common'
import merge from 'webpack-merge'
import validate from 'webpack-validator'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin';

const config: WebpackConfiguration = validate(merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap"),
      },
    ]
  },

  devServer: {
    stats: {
      chunks: false,
    }
  },

  plugins: [
    new FlowStatusWebpackPlugin({
      onSuccess: stdout => console.log(stdout),
      onError: stdout => console.log(stdout),
    }),
    new ExtractTextPlugin("[name].css", { }),
  ],

  output: {
    filename: '[name].js',
  },
}))

export default config 