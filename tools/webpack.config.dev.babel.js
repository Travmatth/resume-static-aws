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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        // loader: ExtractTextPlugin.extract({
        //   fallbackLoader: 'style-loader',
        //   loader: 'css-loader?sourceMap!postcss-loader'
        // })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        // loader: ExtractTextPlugin.extract({
        //   fallbackLoader: 'style-loader',
        //   loader: 'css-loader?sourceMap!postcss-loader!sass-loader'
        // })
      },
    ]
  },

  plugins: [
    ...common.plugins,
    new ExtractTextPlugin("[name].css", {
        // allChunks: true
    }),
    // require('postcss-smart-import')({ /* ...options */ }),
    // require('precss')({ /* ...options */ }),
    // require('autoprefixer')({ /* ...options */ })
  ],

  output: {
    filename: '[name].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },
})