/* @flow */

import type {
  UserStream,
  Stream,
  AllStreams,
  UndeterminedStreamType,
  PossiblyNestedStreams,
  PossibleStream,
} from '../twitchtv.types';
import TWITCH_TV_API_KEY from 'protected/twitch.key';
import { trim, withTimeout } from 'common/js/utils';
import { STREAMS_URL, USERS_URL, USERS, extractUserName } from '../Models';

const TWITCHTV_TIMEOUT = 5000;

const headers = new Headers({
  Accept: 'application/vnd.twitchtv.v3+json',
  'Client-ID': trim(TWITCH_TV_API_KEY),
});

const options = { headers, method: 'GET', mode: 'cors' };

const verifyUser = async (user: string) =>
  fetch(
    new Request(USERS_URL + user, options),
  ).then(async (response: Response) => {
    const res = await response.json();
    if (response.status >= 400 || res.hasOwnProperty('error')) return false;
    return true;
  });

const handleNullStream = async (body: UserStream) => {
  // If stream is null this could either be due to:
  // nonexistent user || an offline user
  // additional call to channel route is needed to determine which case
  const user = extractUserName(body);

  return (await verifyUser(user))
    ? `${user} is offline`
    : `${user} is not a streamer`;
};

const classify = async (response: Response): Promise<PossiblyNestedStreams> => {
  if (response.status >= 400) {
    console.error('Invalid response to GET stream request', response);
    return null;
  }
  const body = ((await response.json(): any): UndeterminedStreamType);

  if (body.hasOwnProperty('streams')) {
    const streams = ((body: any): AllStreams).streams;
    return streams.map(stream => ({ error: false, stream }));
  } else if (((body: any): Stream).stream) {
    const stream = ((body: any).stream: Stream);
    return { error: false, stream };
  } else {
    const status = await handleNullStream(((body: any): UserStream));
    return { error: true, status };
  }
};

const fetchProfile = (user: string): Promise<PossiblyNestedStreams> =>
  withTimeout(fetch(new Request(STREAMS_URL + user, options)), TWITCHTV_TIMEOUT)
    .then(classify)
    .catch(message => {
      console.error(message);
      return null;
    });

const agglomerate = (responses: Array<PossiblyNestedStreams>): Array<Stream> =>
  ((responses.reduce((result, current, index, array) => {
    if (current === null) {
      // If all network request fails, should move to error state
      const firstItem = index === array.length - 1;
      if (firstItem && array.every(el => el === null)) {
        throw new Error('offline');
      } else {
        return result;
      }
    } else if (Array.isArray(current)) {
      return result.concat(current);
    } else {
      result.push(current);
      return result;
    }
  }, []): any): Array<Stream>);

const fetchAllProfiles = (): Promise<Array<PossibleStream>> =>
  Promise.all([...USERS.map(fetchProfile)]).then(agglomerate);

export {
  verifyUser,
  handleNullStream,
  classify,
  fetchProfile,
  fetchAllProfiles,
  agglomerate,
  TWITCHTV_TIMEOUT,
};
