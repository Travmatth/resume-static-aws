/* @flow */

import type { Headings, Paragraphs, Searches } from '../wikiviewer.types';
import { search } from '../Api';
import { removeChildren } from 'common/js/utils';

const showScene = (content, spinner, error) => scene => {
  let contentHidden, spinnerHidden, errorHidden;
  switch (scene) {
    case 'loading':
      contentHidden = true;
      spinnerHidden = false;
      errorHidden = true;
      break;
    case 'content':
      contentHidden = false;
      spinnerHidden = true;
      errorHidden = true;
      break;
    case 'error':
      contentHidden = true;
      spinnerHidden = true;
      errorHidden = false;
      break;
    default:
      contentHidden = true;
      spinnerHidden = true;
      errorHidden = true;
      break;
  }

  content.classList.toggle('hidden', contentHidden);
  spinner.classList.toggle('hidden', spinnerHidden);
  error.classList.toggle('hidden', errorHidden);
};

const updateDOM = (
  searches: Searches,
  node: HTMLElement,
  show: ?string => void,
) => {
  if (node.children.length !== 0) removeChildren(node);
  const fragment = document.createDocumentFragment();

  searches.forEach((wiki: WikiPage) => {
    const result = document.createElement('div');
    result.classList.add(
      'card',
      'column',
      'is-10',
      'is-offset-1',
      'bottom-spacing',
    );
    result.innerHTML = require('../Assets/tile.html');

    const a = result.querySelector('a');
    a.textContent = wiki.title;
    a.href = `https://en.wikipedia.org/?curid=${wiki.pageid}`;

    result.querySelector('p').textContent = wiki.extract.replace(
      /may refer to:/,
      'disambiguation page.',
    );

    fragment.appendChild(result);
  });

  show('content');
  node.appendChild(fragment);
};

const randomHandler = (win: window) => () =>
  win.location = 'https://en.wikipedia.org/wiki/Special:Random';

const refreshResults = async (
  query: Array<string>,
  node: HTMLElement,
  show: ?string => void,
) => {
  if (query === '') return;
  show('loading');
  const results = await search(query);
  if (results) {
    updateDOM(results, node, show);
  } else {
    show('error');
  }
};

const searchHandler = (node: HTMLElement, show: ?string => void) => () =>
  refreshResults(getQuery(), node, show);

const getQuery = () => document.querySelector('input').value;

const keypressHandler = (node: HTMLElement, show: ?string => void) => async (
  event: Event,
) => {
  if (event.key === 'Enter') refreshResults(getQuery(), node, show);
};

export {
  updateDOM,
  randomHandler,
  searchHandler,
  refreshResults,
  keypressHandler,
  showScene,
};
