/* @flow */

// Commented out for compilation perf during dev
const pages = [
  'index',
  //'calculator/index',
  'localweather/index',
  //'pomodoro/index',
  //'randomquote/index',
  //'simon/index',
  //'tictactoe/index',
  //'twitchtv/index',
  'wikiviewer/index',
];

const compile = (configure: string => Object) =>
  pages.reduce((keyedConfig, page) => {
    keyedConfig[page] = configure(page);
    return keyedConfig;
  }, {});

export { compile };
