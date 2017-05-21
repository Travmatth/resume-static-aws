/* @flow */

import { endpoint, params } from './constants';
import type {
  WikiSearchResult,
  WikiPage,
  Headings,
  Paragraphs,
  Searches,
} from '../wikiviewer.types';
import { serialize, ResponseError } from 'common/utils';

const query = [];

const updateDOM = (
  searches: Searches,
  headings: Headings,
  paragraphs: Paragraphs,
) => {
  if (searches) {
    let node, result, imgNode;

    for (var i = 0; i < headings.length; i++) {
      let wiki = searches[i];
      const page = `https://en.wikipedia.org/?curid=${wiki.pageid}`;
      const paragraph = wiki.extract.replace(
        /may refer to:/,
        'disambiguation:',
      );

      headings[i].children[0].textContent = wiki.title;
      ((headings[i].children[1]: any): HTMLAnchorElement).href = page;
      paragraphs[i].textContent = paragraph;
    }
  }
};

const search = () => {
  if (!query.length === 0) return;

  params['gsrsearch'] = query.join('');
  return fetch(serialize(endpoint, params))
    .then(checkHeaders)
    .then(processWikis)
    .catch(err => {
      return null;
    });
};

const randomHandler = (win: window) => {
  return () => {
    win.location = 'https://en.wikipedia.org/wiki/Special:Random';
  };
};

const searchHandler = (headings: Headings, paragraphs: Paragraphs) => {
  return () => refreshResults(headings, paragraphs);
};

const refreshResults = async (headings: Headings, paragraphs: Paragraphs) => {
  updateDOM(await search(), headings, paragraphs);
};

const keypressHandler = (headings: Headings, paragraphs: Paragraphs) => {
  return async (event: Event) => {
    if (event.key === 'Enter') {
      refreshResults(headings, paragraphs);
    } else if (event.key === 'Backspace' && query.length > 0) {
      query = query.slice(0, -1);
    }
  };
};

const typeHandler = (event: Event) => {
  query.push(((event.target: any): HTMLInputElement).value);
};

const checkHeaders = (response: Response) => {
  if (response.status >= 400)
    throw new ResponseError('WikiViewer fetch failed', response);
  return ((response.json(): any): Promise<WikiSearchResult>);
};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export {
  updateDOM,
  search,
  randomHandler,
  searchHandler,
  refreshResults,
  keypressHandler,
  typeHandler,
  checkHeaders,
  processWikis,
};
