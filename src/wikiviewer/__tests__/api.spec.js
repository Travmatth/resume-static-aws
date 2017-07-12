/* @flow */

import { search, checkHeaders, processWikis } from '../Api';
import { ResponseError } from 'common/js/utils';
import { dispatch, json } from 'tests/utils';
import type { WikiPage, WikiSearchResult } from '../wikiviewer.types';
import { wikis, exampleWikipediaSearch } from './wikiviewer.mockdata';

const objectify = (arr: Array<WikiPage>) =>
  arr.reduce((curr, acc) => acc[curr.pageid] = curr, {});

describe('WikiViewer Api', () => {
  afterEach(() => fetch.resetMocks());

  it('search should return parsed json object', async () => {
    fetch.mockResponseOnce(json(exampleWikipediaSearch), { status: 200 });
    const data = ((await search(['foo']): any): Array<WikiPage>);
    const returned = objectify(data);
    const expected = objectify(wikis);

    expect(returned).toEqual(expected);
  });

  it('search should return [] on empty query', async () => {
    expect(await search('')).toEqual([]);
  });

  it('search should return [] on fetch error', async () => {
    fetch.mockResponseOnce(json(exampleWikipediaSearch), { status: 404 });
    expect(await search(['foo'])).toEqual([]);
  });

  it('processWikis should normalize nested json into array', () => {
    const wikis = (({
      query: {
        pages: {
          limits: '',
          a: 'a',
          b: 'b',
          c: 'c',
        },
      },
    }: any): WikiSearchResult);

    expect(processWikis(wikis)).toEqual(['a', 'b', 'c']);
  });
});
