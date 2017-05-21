/* @flow */

import type { Headings, Paragraphs, Searches } from '../wikiviewer.types';
import { search } from './Api';

const updateDOM = (
  searches: Searches,
  headings: Headings,
  paragraphs: Paragraphs,
) => {
  if (searches) {
    let node, result, imgNode;

    for (var i = 0; i < searches.length; i++) {
      if (!(headings[i] && paragraphs[i])) break;

      let wiki = searches[i];
      const page = `https://en.wikipedia.org/?curid=${wiki.pageid}`;
      const paragraph = wiki.extract.replace(
        /may refer to:/,
        'disambiguation page.',
      );

      headings[i].children[0].textContent = wiki.title;
      ((headings[i].children[1]: any): HTMLAnchorElement).href = page;
      paragraphs[i].textContent = paragraph;
    }
  }
};

const randomHandler = (win: window) => {
  return () => win.location = 'https://en.wikipedia.org/wiki/Special:Random';
};

const searchHandler = (
  query: Array<string>,
  headings: Headings,
  paragraphs: Paragraphs,
) => {
  return () => refreshResults(query, headings, paragraphs);
};

const refreshResults = async (
  query: Array<string>,
  headings: Headings,
  paragraphs: Paragraphs,
) => {
  const searches = await search(query);
  updateDOM(searches, headings, paragraphs);
};

const keypressHandler = (
  query: Array<string>,
  headings: Headings,
  paragraphs: Paragraphs,
) => async (event: Event) => {
  if (event.key === 'Enter') {
    refreshResults(query, headings, paragraphs);
  } else if (event.key === 'Backspace' && query.length > 0) {
    query = query.splice(-1, 1);
  }
};

const typeHandler = (query: Array<string>) => (event: Event) => {
  query.push(((event.target: any): HTMLInputElement).value);
};

export {
  updateDOM,
  randomHandler,
  searchHandler,
  refreshResults,
  keypressHandler,
  typeHandler,
};
