/* @flow */
'use strict';
import { WikiViewer } from '../Models';

describe('WikiViewer Model', () => {
  beforeAll(() => {});

  it('search should call fetch with correct url', () => {
    //search() {
    //const { query } = this;
    //if (!query.length === 0) return;
    //params['gsrsearch'] = query.join('');
    //return fetch(serialize(endpoint, params))
    //.then(checkHeaders)
    //.then(processWikis)
    //.catch(err => {
    //console.error('Fetch failed', err);
    //return null;
    //});
    //}
  });

  it('search should call fetch and parse results', () => {
    //search() {
    //const { query } = this;
    //if (!query.length === 0) return;
    //params['gsrsearch'] = query.join('');
    //return fetch(serialize(endpoint, params))
    //.then(checkHeaders)
    //.then(processWikis)
    //.catch(err => {
    //console.error('Fetch failed', err);
    //return null;
    //});
    //}
  });

  it('', () => {
    //randomHandler(win: window) {
    //return () => {
    //win.location = 'https://en.wikipedia.org/wiki/Special:Random';
    //};
    //}
  });

  it('', () => {
    //searchHandler(headings: Headings, paragraphs: Paragraphs) {
    //return () => {
    //this.refreshResults(headings, paragraphs);
    //};
    //}
  });

  it('keypressHandler should trigger refreshResults on enter key press', () => {
    //keypressHandler(headings: Headings, paragraphs: Paragraphs) {
    //return async (event: Event) => {
    //if (event.key === 'Enter') {
    //this.refreshResults(headings, paragraphs);
    //} else if (event.key === 'Backspace' && this.query.length > 0) {
    //this.query = this.query.slice(0, -1);
    //}
    //};
    //}
  });

  it('keypressHandler should remove last element on backspace key press', () => {
    //keypressHandler(headings: Headings, paragraphs: Paragraphs) {
    //return async (event: Event) => {
    //if (event.key === 'Enter') {
    //this.refreshResults(headings, paragraphs);
    //} else if (event.key === 'Backspace' && this.query.length > 0) {
    //this.query = this.query.slice(0, -1);
    //}
    //};
    //}
  });

  it('typeHandler should update the model state', () => {
    //typeHandler(event: Event) {
    //this.query.push(((event.target: any): HTMLInputElement).value);
    //}
  });

  it('checkHeaders should return json if status is OK', () => {
    //function checkHeaders(response: Response) {
    //if (response.status >= 400)
    //throw new ResponseError('WikiViewer fetch failed', response);
    //return ((response.json(): any): Promise<WikiSearchResult>);
    //}
  });

  it('checkHeaders should throw if response is invalid', () => {
    //function checkHeaders(response: Response) {
    //if (response.status >= 400)
    //throw new ResponseError('WikiViewer fetch failed', response);
    //return ((response.json(): any): Promise<WikiSearchResult>);
    //}
  });

  it('processWikis should parse returned json', () => {
    //function processWikis({ query: { pages } }: WikiSearchResult) {
    //const { limits, ...wikis } = pages;
    //return Object.keys(wikis);
    //}
  });

  it('updateDOM should populate HTMLElements with search results', () => {
    //updateDOM(searches: Searches, headings: Headings, paragraphs: Paragraphs) {
    //if (searches) {
    //let node, result, imgNode;
    //for (var i = 0; i < headings.length; i++) {
    //let wiki = searches[i];
    //const page = `https://en.wikipedia.org/?curid=${wiki.pageid}`;
    //((headings[i].children[1]: any): HTMLAnchorElement).href = page;
    //headings[i].children[0].textContent = wiki.title;
    //paragraphs[i].textContent = wiki.extract.replace(
    ///may refer to:/,
    //'disambiguation',
    //);
    //}
    //}
    //}
  });

  it('refreshResults should call updateDOM', () => {
    //async refreshResults(headings: Headings, paragraphs: Paragraphs) {
    //this.updateDOM(await this.search(), headings, paragraphs);
    //}
  });
});
