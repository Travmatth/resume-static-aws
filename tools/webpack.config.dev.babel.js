import common from './common'
import validate from 'webpack-validator'

export default validate({
  ...common.entries,
  ...common.resolveExtensions,

  module: {
    loaders: [...common.loaders]
  },

  plugins: [...common.plugins],

  output: {
    filename: '[name].js',
    path: common.PATHS.outputFolder,
    publicPath: common.PATHS.publicPath, 
  },
})