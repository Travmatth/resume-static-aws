/* @flow */

import { ENDPOINT, PARAMS } from '../Models';
import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';
import { serialize, ResponseError, checkHeaders } from 'common/js/utils';
import { WIKI_PROXY } from 'common/protected/proxies';

const headers = new Headers({
  'Content-Type': 'text/plain',
});

const search = (query: ?string): Promise<Array<WikiPage>> => {
  if (!query && query.length === 0) return Promise.resolve([]);

  PARAMS['gsrsearch'] = query;
  const opts = {
    headers,
    method: 'POST',
    body: serialize(ENDPOINT, PARAMS),
  };

  return fetch(WIKI_PROXY, opts)
    .then(checkHeaders)
    .then(processWikis)
    .catch(err => []);
};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export { search, processWikis };
