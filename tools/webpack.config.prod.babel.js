import common from './common'
import autoprefixer from 'autoprefixer'
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader"),
      },
    ],
  },

  plugins: [
    ...common.plugins,
    new ExtractTextPlugin("[name].[hash].css", { }),
  ],

  postcss: [
    autoprefixer({ 
      browsers: ['last 2 versions'] 
    })
  ], 

  output: {
    filename: '[name].[hash].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },
})
