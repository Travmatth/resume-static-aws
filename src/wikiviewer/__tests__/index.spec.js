/* @flow */

import test from 'ava';
import WikiViewer from './Wikiviewer';
import { jsdom } from 'jsdom';
import fetchMock from 'fetch-mock';
import { ResponseError } from '../../common/utils';
import { response, data } from './wikiviewer.mockdata';
import { endpoint } from './constants';

let wikiViewer, searchButton, randomButton, searchInput;

const nodes = ((jsdom(
  '<li class="wikiPage">' +
    '<div class="content">' +
    '<h2 class="title" />' +
    '<a class="squish"> Open in Wikipedia </a> ' +
    '</div>' +
    '<p/>' +
    '</li>',
).getElementsByClassName('wikiPage'): any): HTMLCollection<HTMLElement>);

test.beforeEach(() => {
  searchButton = ((document.createElement('button'): any): HTMLButtonElement);
  randomButton = ((document.createElement('button'): any): HTMLButtonElement);
  searchInput = ((document.createElement('input'): any): HTMLInputElement);

  wikiViewer = new WikiViewer(searchButton, randomButton, searchInput, nodes);
});

test.afterEach.always('after', t => fetchMock.restore());

/*
  Test
*/

test("search should properly form url's", async t => {
  fetchMock.post(endpoint, response);
});

test('search should return null on incorrect response', async t => {
  fetchMock.post(endpoint, response);
});

test("search should fetch and process wiki's", async t => {
  fetchMock.post(endpoint, response);
});

test('randomSearch should change window location', async t => {});

test("enter should fetch wiki's and update dom", async t => {
  fetchMock.post(endpoint, response);
});

test('type should update state of wikiviewer with text', async t => {});

test('enter should be able to delete text', async t => {});

test('checkHeaders should throw on incorrect response', async t => {});

test('checkHeaders should return response body', async t => {});

test("processWikis should return nested wiki's", async t => {});

test('updateDOM should do so', async t => {
  t.fail();
});
