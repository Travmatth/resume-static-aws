/* @flow */

import { ENDPOINT, PARAMS } from '../Models';
import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';
import { serialize, ResponseError, checkHeaders } from 'common/js/utils';

const headers = new Headers({
  'Content-Type': 'text/plain',
});
const url =
  'https://us-central1-gcf-randomquote-proxy.cloudfunctions.net/gcf-wiki-proxy';

const search = (query: ?string): Promise<Array<WikiPage>> => {
  if (!query && query.length === 0) return Promise.resolve([]);

  PARAMS['gsrsearch'] = query;
  const opts = {
    headers,
    method: 'POST',
    body: serialize(ENDPOINT, PARAMS),
  };

  return fetch(url, opts)
    .then(checkHeaders)
    .then(processWikis)
    .catch(err => []);
};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export { search, processWikis };
