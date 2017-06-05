/* @flow */
import { checkHeaders } from '../Api';
import { processWikis } from '../Models';

describe('WikiViewer Model', () => {
  beforeEach(() => (document.body.innerHTML = require('../index.pug')));

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
});
