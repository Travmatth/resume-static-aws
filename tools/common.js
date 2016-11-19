import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { StatsWriterPlugin } from "webpack-stats-plugin"

const root = process.cwd()
const path = require('path')

const paths = {
  root: root,
  publicPath: '/',
  entry: ['babel-polyfill', path.resolve(root, './src/index.js')],
  outputFolder: path.resolve(root, './dist'),
  to: file => path.resolve(root, `./src/${file}/index.js`)
}

const pages = [
  'blog',
  'calculator',
  'localweather',
  'pomodoro',
  'randomquote',
  'simon',
  'tictactoe',
  'twitchtv',
  'wikiviewer',
]

const common = {
  PATHS: paths,

  entries: {
    entry: {
      'index': paths.entry,
      'blog/index': paths.to('blog'),
      'simon/index': paths.to('simon'),
      'pomodoro/index': paths.to('pomodoro'),
      'twitchtv/index': paths.to('twitchtv'),
      'tictactoe/index': paths.to('tictactoe'),
      'wikiviewer/index': paths.to('wikiviewer'),
      'calculator/index': paths.to('calculator'),
      'randomquote/index': paths.to('randomquote'),
      'localweather/index': paths.to('localweather'),
    },
  },

  resolveExtensions: {
    resolve: {
      extensions: ['', '.js'],
    }
  },

  loaders: [
    { 
      test: /\.js$/, 
      loader: 'babel', 
      exclude: /node_modules/,
      query: {
        plugins: ['transform-runtime'],
      },
    },
    { 
      test: /\.pug$/, 
      exclude: /node_modules/,
      loader: 'pug-loader' 
    },
  ],

  plugins: [
    // Write out stats file to build directory.
    new StatsWriterPlugin(),
    // generate index page
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['index'],
      template: 'src/index.pug',
      title: 'index',
      filename: 'index.html',
    }),
    // generate project pages
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        inject: false,
        chunks: [`${page}/index`],
        template: `src/${page}/index.pug`,
        title: `${page}`,
        filename: `${page}/index.html`,
      })
    }),
    // new webpack.DefinePlugin(),
  ]
}

export default common