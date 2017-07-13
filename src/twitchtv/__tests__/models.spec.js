/* @flow */

import { nonexistentOrOfflineUserStream } from './mockdata';
import { extractUserName } from '../Models';

describe('TwitchTV Models', () => {
  it('extractUserName should do so', async () => {
    const name = '187gmhouh';

    expect(name).toBe(extractUserName(nonexistentOrOfflineUserStream(name)));
  });
});
