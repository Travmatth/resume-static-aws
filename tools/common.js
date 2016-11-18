var path = require('path')

var root = process.cwd()

var paths = {
  root: root,
  publicPath: '/',
  entry: path.resolve(root, './src/index.js'),
  outputFolder: path.resolve(root, './dist'),
}

module.exports = {
  PATHS: paths,
  pathTo: function() {
  },
  resolveExtensions: ['', '.js'],
}