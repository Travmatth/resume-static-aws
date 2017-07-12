/* @flow */

import type { Headings, Paragraphs, Searches } from '../wikiviewer.types';
import { search } from '../Api';
import { removeChildren } from 'common/js/utils';

const updateDOM = (searches: Searches, node: HTMLElement) => {
  if (node.children.length !== 0) removeChildren(node);

  searches.forEach((wiki: WikiPage) => {
    const result = document.createElement('div');
    result.classList.add('card', 'column', 'is-10', 'is-offset-1');
    result.innerHTML = require('../Assets/tile.html');

    const page = `https://en.wikipedia.org/?curid=${wiki.pageid}`;

    const a = result.querySelector('a');
    a.textContent = wiki.title;
    a.href = page;

    result.querySelector('p').textContent = wiki.extract.replace(
      /may refer to:/,
      'disambiguation page.',
    );

    node.appendChild(result);
  });
};

const randomHandler = (win: window) => () =>
  win.location = 'https://en.wikipedia.org/wiki/Special:Random';

const searchHandler = (node: HTMLElement) => () =>
  refreshResults(getQuery(), node);

const refreshResults = async (query: Array<string>, node: HTMLElement) => {
  const results = await search(query);
  updateDOM(results, node);
};

const keypressHandler = (node: HTMLElement) => async (event: Event) => {
  if (event.key === 'Enter') refreshResults(getQuery(), node);
};

const getQuery = () => document.querySelector('input').value;

export {
  updateDOM,
  randomHandler,
  searchHandler,
  refreshResults,
  keypressHandler,
};
