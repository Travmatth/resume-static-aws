/* @flow */
'use strict';

import { WikiViewer, endpoint } from '../Models';
import { ResponseError } from '../../common/utils';
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

test("search should properly form url's", async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
});

test('search should return null on incorrect response', async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
});

test("search should fetch and process wiki's", async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
});

test('randomSearch should change window location', async () => {});

test("enter should fetch wiki's and update dom", async () => {
  fetch.mockResponseOnce(JSON.stringify(exampleWikipediaSearch), {
    status: 200,
  });
});

test('type should update state of wikiviewer with text', async () => {});

test('enter should be able to delete text', async () => {});

test('checkHeaders should throw on incorrect response', async () => {});

test('checkHeaders should return response body', async () => {});

test("processWikis should return nested wiki's", async () => {});

test('updateDOM should do so', async () => {});
