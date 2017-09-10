/* @flow */

import {
  refreshResults,
  randomHandler,
  searchHandler,
  keypressHandler,
  updateDOM,
  showScene,
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

  it('showScene should handle default state', () => {
    const content = document.createElement('div');
    const spinner = document.createElement('div');
    const error = document.createElement('div');

    showScene(content, spinner, error)();

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(true);
  });

  it('showScene should handle loading state', () => {
    const content = document.createElement('div');
    const spinner = document.createElement('div');
    const error = document.createElement('div');

    showScene(content, spinner, error)('loading');

    expect(content.classList.contains('hidden')).toBe(true);
    expect(spinner.classList.contains('hidden')).toBe(false);
    expect(error.classList.contains('hidden')).toBe(true);
  });

  it('showScene should handle content state', () => {
    const content = document.createElement('div');
    const spinner = document.createElement('div');
    const error = document.createElement('div');

    showScene(content, spinner, error)('content');

    expect(error.classList.contains('hidden')).toBe(true);
    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);
  });

  it('showScene should handle error state', () => {
    const content = document.createElement('div');
    const spinner = document.createElement('div');
    const error = document.createElement('div');

    showScene(content, spinner, error)('error');

    expect(error.classList.contains('hidden')).toBe(false);
    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(true);
  });

  it('randomHandler should change window location', () => {
    const win = { location: '' };
    randomHandler(win)();
    expect(win.location).toBe('https://en.wikipedia.org/wiki/Special:Random');
  });

  it('searchHandler should call refreshResults and updateDOM', async () => {
    const node = document.createElement('div');
    const show = jest.fn();
    document.querySelector('input').value = 'a';

    await searchHandler(node, show)();

    const a = node.querySelector('a');
    const p = node.querySelector('p');
    expect(show).toHaveBeenCalledTimes(2);
    expect(a.textContent).toBe('Big Boss');
    expect(a.href).toBe('https://en.wikipedia.org/?curid=11937256');
    expect(p.textContent).toBe('Big Boss disambiguation page.');
  });

  it('refreshResults should return early on empty query', async () => {
    const query = '';
    const node = document.createElement('div');
    const show = jest.fn();

    refreshResults(query, node, show);
    expect(show).not.toHaveBeenCalled();
  });

  it('refreshResults should call updateDOM with results of search', async () => {
    const node = document.createElement('div');
    const show = jest.fn();
    document.querySelector('input').value = 'a';

    await searchHandler(node, show)();

    const a = node.querySelector('a');
    const p = node.querySelector('p');
    expect(show).toHaveBeenCalledTimes(2);
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
    const show = jest.fn();
    updateDOM(wikis.slice(0, 1), node, show);
    const a = node.querySelector('a');
    const p = node.querySelector('p');

    expect(show).toHaveBeenCalledTimes(1);
    expect(a.textContent).toBe('Big Boss');
    expect(a.href).toBe('https://en.wikipedia.org/?curid=11937256');
    expect(p.textContent).toBe('Big Boss disambiguation page.');
  });

  it('updateDOM should remove previously attached elements', async () => {
    const show = jest.fn();
    const node = document.createElement('div');
    const node2 = document.createElement('div');
    node2.textContent = 'test';
    node.appendChild(node2);

    updateDOM(wikis.slice(0, 1), node, show);

    expect(show).toHaveBeenCalledTimes(1);
    expect(node.children[0].textContent).not.toBe('test');
  });
});
