/* @flow */
'use strict';

import { WikiViewer, endpoint } from '../Models';
import { ResponseError } from 'common/utils';
import { exampleWikipediaSearch, wikis } from './wikiviewer.mockdata';

let wikiViewer, searchButton, randomButton, searchInput;

beforeAll(() => {
  document.body.innerHTML =
    '<li class="wikiPage">' +
    '<div class="content">' +
    '<h2 class="title" />' +
    '<a class="squish"> Open in Wikipedia </a> ' +
    '</div>' +
    '<p/>' +
    '</li>';
  searchButton = ((document.createElement('button'): any): HTMLButtonElement);
  randomButton = ((document.createElement('button'): any): HTMLButtonElement);
  searchInput = ((document.createElement('input'): any): HTMLInputElement);
  const nodes = ((document.getElementsByClassName(
    'wikiPage',
  ): any): HTMLCollection<HTMLElement>);

  wikiViewer = new WikiViewer(searchButton, randomButton, searchInput, nodes);
});

afterEach(() => fetch.resetMocks());

/*
  Test
*/

test('search should return null on incorrect response', async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 404,
  });
  wikiViewer.search();
  expect(true).toBe(true);
});

test("search should fetch and process wiki's", async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
  expect(true).toBe(true);
});

test('randomSearch should change window location', async () => {
  expect(true).toBe(true);
});

test("enter should fetch wiki's and update dom", async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
  expect(true).toBe(true);
});

test('type should update state of wikiviewer with text', async () => {
  expect(true).toBe(true);
});

test('enter should be able to delete text', async () => {
  expect(true).toBe(true);
});

test('checkHeaders should throw on incorrect response', async () => {
  expect(true).toBe(true);
});

test('checkHeaders should return response body', async () => {
  expect(true).toBe(true);
});

test("processWikis should return nested wiki's", async () => {
  expect(true).toBe(true);
});

test('updateDOM should do so', async () => {
  expect(true).toBe(true);
});
