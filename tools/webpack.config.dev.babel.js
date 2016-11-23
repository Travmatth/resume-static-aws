/* @flow */
import webpack from 'webpack'
import common from './common'
import merge from 'webpack-merge'
import validate from 'webpack-validator'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config: WebpackConfiguration = validate(merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap"),
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css", { }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
  ],

  output: {
    filename: '[name].js',
  },
}))

export default config 