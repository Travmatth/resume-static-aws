/* @flow */
'use strict';
import { WikiViewer, checkHeaders, processWikis } from '../Models';

describe('WikiViewer Model', () => {
  let wikiviewer: WikiViewer;

  beforeEach(() => {
    wikiviewer = new WikiViewer();
    document.body.innerHTML = require('../index.pug');
  });

  it('checkHeaders should reject on invalid response.status', async () => {
    const res = { status: 404 };
    try {
      checkHeaders(res);
    } catch (error) {
      expect(error.response.status === res.status);
    }
  });

  it('checkHeaders should return json if valid response', async () => {
    const res = {
      status: 200,
      json: () => {
        return Promise.resolve('working');
      },
    };

    expect(await checkHeaders(res)).toBe('working');
  });

  it('processWikis should normalize nested json into array', () => {
    const wikis = {
      query: {
        pages: {
          limits: '',
          a: 'a',
          b: 'b',
          c: 'c',
        },
      },
    };

    expect(processWikis(wikis)).toEqual(['a', 'b', 'c']);
  });

  it('randomHandler should change window location', () => {
    const url = 'https://en.wikipedia.org/wiki/Special:Random';
    const win = {};
    win.location = '';

    const random = wikiviewer.randomHandler(win);
    random();

    expect(win.location).toBe(url);
  });

  it('function returned by searchHandler should call refreshResults', async () => {
    const spy = jest
      .spyOn(wikiviewer, 'refreshResults')
      .mockImplementation(() => {});

    const headings = document.getElementsByTagName('h2');
    const paragraphs = document.getElementsByTagName('p');
    const search = wikiviewer.searchHandler(headings, paragraphs);

    await search();
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('keypressHandler should trigger refreshResults on enter key press', async () => {
    const spy = jest
      .spyOn(wikiviewer, 'refreshResults')
      .mockImplementation(() => {});

    const keyPress = wikiviewer.keypressHandler(
      document.getElementsByTagName('h2'),
      document.getElementsByTagName('p'),
    );

    await keyPress({ key: 'Enter' });
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('keypressHandler should remove last element on backspace key press', async () => {
    const presses = ['a', 'b', 'c'];
    const ev = x => ({ target: { value: x } });

    wikiviewer.typeHandler(ev('a'));
    wikiviewer.typeHandler(ev('b'));
    wikiviewer.typeHandler(ev('c'));

    const keyPress = wikiviewer.keypressHandler(
      document.getElementsByTagName('h2'),
      document.getElementsByTagName('p'),
    );

    await keyPress({ key: 'Backspace' });
    expect(wikiviewer.query).toEqual(presses.slice(0, 2));
  });

  it('typeHandler should update the model state', () => {
    const letter = 'f';
    wikiviewer.typeHandler({ target: { value: letter } });
    expect(wikiviewer.query[0]).toBe(letter);
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
    const searches = Array.apply(null, Array(10)).map((_: any, i: number) => ({
      pageid: i,
      ns: i,
      title: `string${i}`,
      index: i,
      extract: `may refer to: string${i}`,
    }));

    const headings = document.querySelectorAll('div.heading');
    const paragraphs = document.getElementsByTagName('p');

    wikiviewer.updateDOM(searches, headings, paragraphs);

    for (let i of Array(10).keys()) {
      const url = `https://en.wikipedia.org/?curid=${i}`;
      expect(headings[i].children[0].textContent).toBe(`string${i}`);
      expect(headings[i].children[1].href).toBe(url);
      expect(paragraphs[i].textContent).toBe(`disambiguation: string${i}`);
    }
  });

  it('refreshResults should call updateDOM', async () => {
    const mock = jest.spyOn(wikiviewer, 'search').mockImplementation(() => {});

    const spy = jest
      .spyOn(wikiviewer, 'updateDOM')
      .mockImplementation(() => {});

    const keyPress = await wikiviewer.refreshResults(
      document.getElementsByTagName('h2'),
      document.getElementsByTagName('p'),
    );

    expect(mock).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

    mock.mockRestore();
    spy.mockRestore();
  });
});
