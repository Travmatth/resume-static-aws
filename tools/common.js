import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { StatsWriterPlugin } from "webpack-stats-plugin"

const root = process.cwd()
const path = require('path')

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
  output: {
    publicPath: '/',
    path: path.resolve(root, 'src/dist'),
  },

  entry: Object.assign({},
    { 'vendor': 
      'babel-polyfill', 
    },
    { 'index': [
      path.resolve(root, './src/index.js'),
      path.resolve(root, 'src/index.scss'),
    ]},
    ...pages.map(page => ({ 
      [`${page}/index`]: [
          path.resolve(root, `./src/${page}/index.js`),
          path.resolve(root, `src/${page}/index.scss`), 
      ]
    }))
  ),

  resolve: {
    extensions: ['', '.js'],
  },

  module: {
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
  },

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
  ]
}

export default common