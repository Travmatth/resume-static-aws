/* @flow */
'use strict';

const pages = [
  'index',
  'blog/index',
  'calculator/index',
  'localweather/index',
  // Commented out for compilation perf during dev
  // 'pomodoro/index',
  // 'randomquote/index',
  // 'simon/index',
  // 'tictactoe/index',
  // 'twitchtv/index',
  // 'wikiviewer/index',
];

// pageConfigs: (page) => config -> { page: config }
const pageConfigs = configure => {
  return pages.reduce((keyedConfig, page) => {
    keyedConfig[page] = configure(page);
    return keyedConfig;
  }, {});
};

export default pageConfigs;
