import common from './common'
import validate from 'webpack-validator'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default validate({
  ...common.entries,
  ...common.resolveExtensions,

  module: {
    loaders: [
      ...common.loaders,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap"),
      },
    ]
  },

  plugins: [
    ...common.plugins,
    new ExtractTextPlugin("[name].css", { }),
  ],

  output: {
    filename: '[name].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },
})