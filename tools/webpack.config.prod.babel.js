/* @flow */
import common from './common'
import webpack from 'webpack'
import merge from 'webpack-merge'
import autoprefixer from 'autoprefixer'
import validate from 'webpack-validator'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config: WebpackConfiguration = validate(merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader"),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin("[name].[hash].css", { }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    //   '__DEV__': false
    // }),
  ],

  postcss: [
    autoprefixer({ 
      browsers: ['last 2 versions'] 
    })
  ], 

  output: {
    filename: '[name].[hash].js',
  },
}))
 
export default config
