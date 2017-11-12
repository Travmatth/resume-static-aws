/* @flow */

const pages = [
  'index',
  'calculator/index',
  'localweather/index',
  'notfound/index',
  'pomodoro/index',
  'randomquote/index',
  'simon/index',
  'tictactoe/index',
  'twitchtv/index',
  'wikiviewer/index',
];

const compile = (configure: string => Object) =>
  pages.reduce((keys, page) => {
    keys[page] = configure(page);
    return keys;
  }, {});

export { compile };
