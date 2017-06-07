/* @flow */

import { endpoint, params } from '../Models';
import type { WikiSearchResult } from '../wikiviewer.types';
import { serialize, ResponseError, checkHeaders } from 'common/utils';

const search = (query: Array<string>) => {
  if (query.length === 0) return null;

  params['gsrsearch'] = query.join('');
  return fetch(serialize(endpoint, params))
    .then(checkHeaders)
    .then(processWikis)
    .catch(err => null);
};

//const checkHeaders = (response: Response) => {
//if (response.status >= 400)
//throw new ResponseError('WikiViewer fetch failed', response);
//return ((response.json(): any): Promise<WikiSearchResult>);
//};

const processWikis = ({ query: { pages } }: WikiSearchResult) => {
  const { limits, ...wikis } = pages;
  return Object.values(wikis);
};

export { search, checkHeaders, processWikis };
