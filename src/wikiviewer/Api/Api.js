/* @flow */

import { endpoint, params } from '../Models';
import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';
import { serialize, ResponseError, checkHeaders } from 'common/js/utils';

const headers = new Headers({
  'Content-Type': 'text/plain',
});
const url =
  'https://us-central1-gcf-randomquote-proxy.cloudfunctions.net/gcf-wiki-proxy';

const search = (query: Array<string>): Promise<?Array<WikiPage>> => {
  if (query.length === 0) return Promise.resolve(null);
  const opts = {
    headers,
    method: 'POST',
    body: serialize(endpoint, params),
  };

  params['gsrsearch'] = query.join('');
  //return fetch(serialize(endpoint, params))
  return fetch(url, opts)
    .then(checkHeaders)
    .then(processWikis)
    .catch(err => null);
};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export { search, processWikis };
