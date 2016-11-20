import common from './common'
import validate from 'webpack-validator'

export default validate({
  ...common.entries,
  ...common.resolveExtensions,

  module: {
    loaders: [
      ...common.loaders,
      {
        test: /\.scss$/, 
        exclude: /node_modules/,
        loader:  ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader",
        }),
      }
    ],
  },

  plugins: [
    ...common.plugins,
  ],

  output: {
    filename: '[name].[hash].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },
})
