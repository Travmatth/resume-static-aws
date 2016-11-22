/* @flow */
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
  to: (file: string): string => path.resolve(root, `./src/${file}/index.js`)
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
      'index': [
        ...paths.entry,
        path.resolve(root, 'src/index.scss'),
      ],
      // ...pages.map(page => ({ [`${page}/index`]: paths.to(page) }))
      'blog/index': [
        'babel-polyfill',
        paths.to('blog'), 
        path.resolve(root, 'src/blog/index.scss'),
      ],
      'simon/index': [
        'babel-polyfill',
        paths.to('simon'), 
        path.resolve(root, 'src/simon/index.scss'),
      ],
      'pomodoro/index': [
        'babel-polyfill',
        paths.to('pomodoro'), 
        path.resolve(root, 'src/pomodoro/index.scss'),
      ],
      'twitchtv/index': [
        'babel-polyfill',
        paths.to('twitchtv'), 
        path.resolve(root, 'src/twitchtv/index.scss'),
      ],
      'tictactoe/index': [
        'babel-polyfill',
        paths.to('tictactoe'), 
        path.resolve(root, 'src/tictactoe/index.scss'),
      ],
      'wikiviewer/index': [
        'babel-polyfill',
        paths.to('wikiviewer'), 
        path.resolve(root, 'src/wikiviewer/index.scss'),
      ],
      'calculator/index': [
        'babel-polyfill',
        paths.to('calculator'), 
        path.resolve(root, 'src/calculator/index.scss'),
      ],
      'randomquote/index': [
        'babel-polyfill',
        paths.to('randomquote'), 
        path.resolve(root, 'src/randomquote/index.scss'),
      ],
      'localweather/index': [
        'babel-polyfill',
        paths.to('localweather'), 
        path.resolve(root, 'src/localweather/index.scss'),
      ],
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