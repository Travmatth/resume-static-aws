/* @flow */

import {
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
      ((document.body: any): HTMLElement).innerHTML = require('../index.pug'),
  );

  afterEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it('randomHandler should change window location', () => {
    const win = { location: '' };
    randomHandler(win)();
    expect(win.location).toBe('https://en.wikipedia.org/wiki/Special:Random');
  });

  it('searchHandler should call refreshResults and updateDOM', async () => {
    const node = document.createElement('div');

    await searchHandler(node)();

    const a = node.querySelector('a');
    const p = node.querySelector('p');
    expect(a.textContent).toBe('Big Boss');
    expect(a.href).toBe('https://en.wikipedia.org/?curid=11937256');
    expect(p.textContent).toBe('Big Boss disambiguation page.');
  });

  it('refreshResults should call updateDOM with results of search', async () => {
    const node = document.createElement('div');

    await searchHandler(node)();

    const a = node.querySelector('a');
    const p = node.querySelector('p');
    expect(a.textContent).toBe('Big Boss');
    expect(a.href).toBe('https://en.wikipedia.org/?curid=11937256');
    expect(p.textContent).toBe('Big Boss disambiguation page.');
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

  it('updateDOM should create elements with returned data', async () => {
    const node = document.createElement('div');
    updateDOM(wikis.slice(0, 1), node);
    const a = node.querySelector('a');
    const p = node.querySelector('p');
    expect(a.textContent).toBe('Big Boss');
    expect(a.href).toBe('https://en.wikipedia.org/?curid=11937256');
    expect(p.textContent).toBe('Big Boss disambiguation page.');
  });

  it('updateDOM should remove previously attached elements', async () => {
    const node = document.createElement('div');
    const node2 = document.createElement('div');
    node2.textContent = 'test';
    node.appendChild(node2);

    updateDOM(wikis.slice(0, 1), node);

    expect(node.children[0].textContent).not.toBe('test');
  });
});
