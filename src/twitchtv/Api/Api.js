/* @flow */

import type {
  UserStream,
  Stream,
  AllStreams,
  UndeterminedStreamType,
  PossiblyNestedStreams,
} from '../twitchtv.types';

import { TWITCH_TV_API_KEY } from 'common/api_keys';
import { serialize } from 'common/utils';
import {
  users,
  streamsUrl,
  userUrl,
  emptyStream,
  createEmptyStream,
  extractUserName,
} from '../Models';

const headers = new Headers({
  Accept: 'application/vnd.twitchtv.v3+json',
  'Client-ID': TWITCH_TV_API_KEY,
});

const options = { headers, method: 'GET', mode: 'cors' };

const verifyUser = async (user: string): Promise<boolean> => {
  const endpoint = userUrl + user;

  return fetch(
    new Request(endpoint, options),
  ).then(async (response: Response) => {
    const res = await response.json();
    if (response.status >= 400 || res.hasOwnProperty('error')) return false;
    return true;
  });
};

const handleNullStream = async (body: UserStream): Promise<Stream> => {
  // If stream is null this could either be due to:
  // a nonexistent user || an offline user
  // additional call to channel route is needed to determine which case
  const user = extractUserName(body);

  if (await verifyUser(user)) return createEmptyStream(true, user);
  else return createEmptyStream(false, user);
};

/**
 * Accepts the Response object from fetch, classifies response and returns
 * a User object
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
    return ((body: any): AllStreams).streams;
  } else if (((body: any): Stream).stream) {
    return ((body: any): Stream);
  } else {
    return handleNullStream(((body: any): UserStream));
  }
};

/**
 * fetchAllProfiles returns an array of promised normalized user objects
 * @type {Function}
 */
const fetchAllProfiles = (users: Array<string>): Promise<Array<Stream>> => {
  // call TwitchTV api, return normalized user object
  const task = (user: string): Promise<PossiblyNestedStreams> => {
    const endpoint = streamsUrl + user;

    return fetch(new Request(endpoint, options)).then(classifyResponse);
  };

  return Promise.all([...users.map(task)]).then(agglomerate);
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
