/* @flow */
import type { WikiSearchResult, WikiPage, WikiInit } from './wikiviewer.types';
import { serialize, ResponseError } from '../common/utils';
import { endpoint, params } from './wikiviewer.constants';
import Wikiviewer from './Wikiviewer';

export const register = () => {
  const searchButton = ((document: any): HTMLButtonElement);
  const randomButton = ((document: any): HTMLButtonElement);
  const searchInput = ((document: any): HTMLInputElement);
  const nodes = ((document: any): HTMLCollection<HTMLElement>);
  const wikiView = new WikiViewer(
    searchButton,
    randomButton,
    searchInput,
    nodes,
  );

  searchInput.onchange = wikiView.type;
  searchInput.onkeypress = wikiView.enter;
  searchButton.addEventListener('onclick', wikiView.search);
};

if (process.env.NODE_ENV !== 'ava') {
  document.addEventListener('DOMContentLoaded', register);
}
