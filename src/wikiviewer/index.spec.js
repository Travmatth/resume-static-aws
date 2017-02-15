/* @flow */

import test from 'ava'
import fetchMock from 'fetch-mock';
import { ResponseError } from '../common/utils'
import { response, data } from './wikiviewer.mockdata'

const searchButton = ((document): any): HTMLButtonElement) 
const randomButton = ((document): any): HTMLInputElement) 
const searchInput = ((document): any): HTMLButtonElement)
const nodes = ((document): any): HTMLCollection<HTMLElement>)

const wikiViewer = new WikiViewer( 
  searchButton, 
  randomButton, 
  searchInput, 
  nodes
)


test.before(() => {})

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})

/*
  Test
*/

test('', async t => {
});

test('updateDOM should do so', async t => {
});

test('search should properly form url\'s', async t => {
  fetchMock.post(url, response);
});

test('search should return null on incorrect response', async t => {
  fetchMock.post(url, response);
});

test('search should fetch and process wiki\'s', async t => {
  fetchMock.post(url, response);
});

test('randomSearch should change window location', async t => {
});

test('enter should fetch wiki\'s and update dom', async t => {
  fetchMock.post(url, response);
});

test('type should update state of wikiviewer with text', async t => {
});

test('type should be able to delete text', async t => {
});

test('checkHeaders should throw on incorrect response', async t => {
});

test('checkHeaders should return response body', async t => {
});

test('processWikis should return nested wiki\'s', async t => {
});
