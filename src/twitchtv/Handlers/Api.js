/* @flow */
'use strict';

import type {
  UserStream,
  Stream,
  AllStreams,
  UndeterminedStreamType,
  PossiblyNestedStreams,
} from '../twitchtv.types';

import { TWITCH_TV_API_KEY } from '../../common/api_keys';
import {
  twitchUser,
  streamsUrl,
  userUrl,
  emptyStream,
  createEmptyStream,
} from './constants';
import { serialize } from '../../common/utils';

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

const handleNullStream = async (body: UserStream): Stream => {
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
const classifyResponse = async (response: Response): PossiblyNestedStreams => {
  if (response.status >= 400) {
    console.error('Invalid response to GET stream request', response);
    return null;
  }

  const body = ((await response.json(): any): UndeterminedStreamType);

  if (body.hasOwnProperty('streams')) {
    return (body.streams: AllStreams);
  } else if ((body: Stream).stream) {
    return body;
  } else {
    return handleNullStream((body: UserStream));
  }
};

/**
 * fetchAllProfiles returns an array of promised normalized user objects
 * @type {Function}
 */
const fetchAllProfiles = (users: Array<string>): Promise<Array<Stream>> => {
  // call TwitchTV api, return normalized user object
  const task = (user: string): PossiblyNestedStreams => {
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

const extractUserName = (user: UserStream): string => {
  return user['_links']['self'].split('/').slice(-1)[0];
};

export {
  verifyUser,
  handleNullStream,
  classifyResponse,
  fetchAllProfiles,
  agglomerate,
  extractUserName,
};
