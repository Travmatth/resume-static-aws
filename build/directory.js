/* @flow */

// Commented out for compilation perf during dev
const pages = [
  'index',
  //'blog/index',
  //'calculator/index',
  //'localweather/index',
  //'pomodoro/index',
  'randomquote/index',
  //'simon/index',
  //'tictactoe/index',
  //'twitchtv/index',
  //'wikiviewer/index',
];

const multiCompiler = (configure: string => Object) => {
  return pages.reduce((keyedConfig, page) => {
    keyedConfig[page] = configure(page);
    return keyedConfig;
  }, {});
};

export { multiCompiler };
