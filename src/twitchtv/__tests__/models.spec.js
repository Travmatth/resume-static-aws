/* @flow */

import { nonexistentOrOfflineUserStream } from './mockdata';
import { emptyStream, createEmptyStream, extractUserName } from '../Models';

describe('TwitchTV Models', () => {
  afterEach(() => fetch.resetMocks());
  it('createEmptyStream should do so', async () => {
    const user = 'fasdf';

    expect(createEmptyStream(true, user)).toEqual(
      Object.assign({}, emptyStream, {
        _id: `${user} is offline`,
      }),
    );

    expect(createEmptyStream(false, user)).toEqual(
      Object.assign({}, emptyStream, {
        _id: `${user} is not a streamer`,
      }),
    );
  });

  it('extractUserName should do so', async () => {
    const name = '187gmhouh';

    expect(name).toBe(extractUserName(nonexistentOrOfflineUserStream(name)));
  });
});
