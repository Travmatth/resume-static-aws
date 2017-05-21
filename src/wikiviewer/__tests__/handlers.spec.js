/* @flow */

import * as Handlers from '../Handlers';
import { ResponseError, dispatch, json } from 'common/utils';
import { wikis, exampleWikipediaSearch } from './wikiviewer.mockdata';

describe('WikiViewer Handlers', () => {
  beforeEach(() => document.body.innerHTML = require('../index.pug'));

  afterEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it('typeHandler should update query with event targets value', () => {
    const query = [];
    Handlers.typeHandler(query)({ target: { value: 'a' } });
    expect(query).toEqual(['a']);
  });

  it('randomHandler should change window location', () => {
    const win = { location: '' };
    Handlers.randomHandler(win)();
    expect(win.location).toBe('https://en.wikipedia.org/wiki/Special:Random');
  });

  it('searchHandler should call refreshResults and updateDOM', async () => {
    fetch.mockResponseOnce(json(exampleWikipediaSearch), { status: 200 });

    const query = ['foo'];
    const paragraphs = document.querySelectorAll('p');
    const headings = document.querySelectorAll('div.heading');

    await Handlers.searchHandler(query, headings, paragraphs)();
    expect(document.body.outerHTML).toMatchSnapshot();
  });

  it('refreshResults should call updateDOM with results of search', async () => {
    fetch.mockResponseOnce(json(exampleWikipediaSearch), { status: 200 });

    const query = ['foo'];
    const paragraphs = document.querySelectorAll('p');
    const headings = document.querySelectorAll('div.heading');

    await Handlers.searchHandler(query, headings, paragraphs)();
    expect(document.body.outerHTML).toMatchSnapshot();
  });

  it("keyPressHandler should call refreshResults on 'Enter' key", async () => {
    fetch.mockResponseOnce(json(exampleWikipediaSearch), { status: 200 });

    const query = ['foo'];
    const paragraphs = document.querySelectorAll('p');
    const headings = document.querySelectorAll('div.heading');

    const handler = Handlers.keypressHandler(query, headings, paragraphs);
    await handler({ key: 'Enter' });

    expect(document.body.outerHTML).toMatchSnapshot();
  });

  it("keyPressHandler should drop elements of query on 'Backspace' key", async () => {
    const paragraphs = document.querySelectorAll('p');
    const headings = document.querySelectorAll('div.heading');
    const query = [];
    const type = Handlers.typeHandler(query);
    type({ target: { value: 'a' } });
    type({ target: { value: 'b' } });

    const handler = Handlers.keypressHandler(query, headings, paragraphs);
    await handler({ key: 'Backspace' });

    expect(query).toEqual(['a']);
  });

  it('updateDOM should populate given elements with returned data', async () => {
    //console.log(document.body.outerHTML);
    const paragraphs = document.querySelectorAll('p');
    const headings = document.querySelectorAll('div.heading');

    await Handlers.updateDOM(wikis, headings, paragraphs);
    const t = document.body.outerHTML;
    //console.log(t);
    expect(t).toMatchSnapshot();
  });
});
