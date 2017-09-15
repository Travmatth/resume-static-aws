/* @flow */

import { ENDPOINT, PARAMS } from '../Models';
import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';
import { WIKI_PROXY } from 'protected/proxies';
import {
  serialize,
  ResponseError,
  checkHeaders,
  timedFetch,
} from 'common/js/utils';

const headers = new Headers({ 'Content-Type': 'text/plain' });

const search = (query: ?string): Promise<Array<WikiPage>> => {
  PARAMS['gsrsearch'] = query;

  const opts = {
    headers,
    method: 'POST',
    body: serialize(ENDPOINT, PARAMS),
  };

  return timedFetch(fetch(WIKI_PROXY, opts), 5000)
    .then(checkHeaders)
    .then(processWikis)
    .catch(message => {
      console.error(message);
      return null;
    });
};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export { search, processWikis };
