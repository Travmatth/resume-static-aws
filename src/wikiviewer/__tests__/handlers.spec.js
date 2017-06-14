/* @flow */

import {
  typeHandler,
  randomHandler,
  searchHandler,
  keypressHandler,
  updateDOM,
} from '../Handlers';
import * as Api from '../Api';
import type { Headings, Paragraphs } from '../wikiviewer.types';
import { ResponseError } from 'common/js/utils';
import { dispatch, json } from 'tests/utils';
import { wikis, exampleWikipediaSearch } from './wikiviewer.mockdata';

jest.mock('../Api', () => ({
  search: () => require('./wikiviewer.mockdata').wikis,
}));

describe('WikiViewer Handlers', () => {
  beforeEach(
    () =>
      //$FlowIgnore
      ((document.body: any): HTMLElement).innerHTML = require('../index.pug'),
  );

  afterEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it('typeHandler should update query with event targets value', () => {
    const query = [];
    typeHandler(query)((({ target: { value: 'a' } }: any): Event));
    expect(query).toEqual(['a']);
  });

  it('randomHandler should change window location', () => {
    const win = { location: '' };
    randomHandler(win)();
    expect(win.location).toBe('https://en.wikipedia.org/wiki/Special:Random');
  });

  it('searchHandler should call refreshResults and updateDOM', async () => {
    const query = ['foo'];
    const paragraphs = ((document.querySelectorAll('p'): any): Paragraphs);
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): Headings);

    await searchHandler(query, headings, paragraphs)();
    expect(((document.body: any): HTMLElement).outerHTML).toMatchSnapshot();
  });

  it('refreshResults should call updateDOM with results of search', async () => {
    const query = ['foo'];
    const paragraphs = ((document.querySelectorAll('p'): any): Paragraphs);
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): Headings);

    await searchHandler(query, headings, paragraphs)();
    expect(((document.body: any): HTMLElement).outerHTML).toMatchSnapshot();
  });

  it("keyPressHandler should call refreshResults on 'Enter' key", async () => {
    const query = ['foo'];
    const paragraphs = ((document.querySelectorAll('p'): any): Paragraphs);
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): Headings);

    const handler = keypressHandler(query, headings, paragraphs);
    await handler((({ key: 'Enter' }: any): Event));

    expect(((document.body: any): HTMLElement).outerHTML).toMatchSnapshot();
  });

  it("keyPressHandler should drop elements of query on 'Backspace' key", async () => {
    const paragraphs = ((document.querySelectorAll('p'): any): Paragraphs);
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): Headings);
    const query = [];
    const type = typeHandler(query);
    type((({ target: { value: 'a' } }: any): Event));
    type((({ target: { value: 'b' } }: any): Event));

    const handler = keypressHandler(query, headings, paragraphs);
    await handler((({ key: 'Backspace' }: any): Event));

    expect(query).toEqual(['a']);
  });

  it('updateDOM should populate given elements with returned data', async () => {
    const paragraphs = ((document.querySelectorAll('p'): any): Paragraphs);
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): Headings);

    await updateDOM(wikis, headings, paragraphs);
    expect(((document.body: any): HTMLElement).outerHTML).toMatchSnapshot();
  });
});
