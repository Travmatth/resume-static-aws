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
import { serialize, trim } from 'common/js/utils';
import { STREAMS_URL, USERS_URL, USERS, extractUserName } from '../Models';

const headers = new Headers({
  Accept: 'application/vnd.twitchtv.v3+json',
  'Client-ID': trim(TWITCH_TV_API_KEY),
});

const options = { headers, method: 'GET', mode: 'cors' };

const verifyUser = async (user: string): Promise<boolean> => {
  const endpoint = USERS_URL + user;

  return fetch(
    new Request(endpoint, options),
  ).then(async (response: Response) => {
    const res = await response.json();
    if (response.status >= 400 || res.hasOwnProperty('error')) return false;
    return true;
  });
};

const handleNullStream = async (body: UserStream): Promise<string> => {
  // If stream is null this could either be due to:
  // nonexistent user || an offline user
  // additional call to channel route is needed to determine which case
  const user = extractUserName(body);

  return (await verifyUser(user))
    ? `${user} is offline`
    : `${user} is not a streamer`;
};

/**
 * Accepts the Response object from fetch,
 * classifies response and returns User object
 */
const classifyResponse = async (
  response: Response,
): Promise<PossiblyNestedStreams> => {
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

const fetchAllProfiles = (): Promise<Array<PossibleStream>> => {
  // call TwitchTV api, return normalized user object
  const task = (user: string): Promise<PossiblyNestedStreams> => {
    const endpoint = STREAMS_URL + user;

    return fetch(new Request(endpoint, options)).then(classifyResponse);
  };

  return Promise.all([...USERS.map(task)]).then(agglomerate);
};

const agglomerate = (userResponses: Array<PossiblyNestedStreams>) => {
  const responses = userResponses.reduce((result, current) => {
    if (current === null) {
      return result;
    } else if (Array.isArray(current)) {
      return result.concat(current);
    } else {
      result.push(current);
      return result;
    }
  }, []);

  return ((responses: any): Array<Stream>);
};

export {
  verifyUser,
  handleNullStream,
  classifyResponse,
  fetchAllProfiles,
  agglomerate,
};
