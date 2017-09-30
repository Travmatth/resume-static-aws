/* @flow */

import { ENDPOINT, PARAMS } from '../Models';
import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';
import { WIKI_PROXY } from 'protected/proxies';
import {
  serialize,
  ResponseError,
  checkHeaders,
  withTimeout,
} from 'common/js/utils';

const WIKI_TIMEOUT = 5000;
const headers = new Headers({ 'Content-Type': 'text/plain' });

const search = (query: ?string): Promise<Array<WikiPage>> => {
  PARAMS['gsrsearch'] = query;

  const opts = {
    headers,
    method: 'POST',
    body: serialize(ENDPOINT, PARAMS),
  };

  return withTimeout(fetch(WIKI_PROXY, opts), WIKI_TIMEOUT)
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

export { search, processWikis, WIKI_TIMEOUT };
