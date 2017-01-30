/* @flow */

import type { 
  UserStream, 
  Stream, 
  AllStreams, 
  UndeterminedStreamType,  
  PossiblyNestedStreams,
} from './twitchtv.types';

import { TWITCH_TV_API_KEY, } from '../common/api_keys';
import { twitchUser, streamsUrl, channelUrl, emptyStream, } from './constants';
import { serialize, ResponseError, } from '../common/utils';

/* Objective: Build a CodePen.io app that is functionally similar to this: 
 * https://codepen.io/FreeCodeCamp/full/Myvqmo/.
 * 
 * Fulfill the below user stories. Use whichever libraries or APIs you need. 
 * Give it your own personal style.
 * 
 * User Story: I can see whether Free Code Camp is currently streaming on 
 * Twitch.tv.
 * 
 * User Story: I can click the status output and be sent directly to the 
 * Free Code Camp's Twitch.tv channel.
 * 
 * User Story: if a Twitch user is currently streaming, I can see additional 
 * details about what they are streaming.
 * 
 * User Story: I will see a placeholder notification if a streamer has closed 
 * their Twitch account (or the account never existed). You can verify this 
 * works by adding brunofin and comster404 to your array of Twitch streamers.
 */

const headers = new Headers({ 
  'Accept': 'application/vnd.twitchtv.v3+json',
  'Client-ID': TWITCH_TV_API_KEY,
});

const options = { headers, method: 'GET', mode: 'cors', };

/* Network calls
 */

const verifyUser = (user: string): Promise<boolean> => {
  const endpoint = channelUrl + user

  return fetch(new Request(endpoint, options))
    .then((response: Response): boolean => {
      if (response.status >= 400 || response.json().hasOwnProperty('error')) 
        return false
      return true
    })
};

const handleNullStream = async (res: Response): Stream => {
  // If stream is null this could either be due to:
  // a nonexistent user || an offline user
  // additional call to channel route is needed to determine 
  const user = extractUserName(res.url)
  const validUser = await verifyUser(user);

  if (validUser) {
    return convertToOfflineStream((response: UserStream), user) //returns Stream 
  } else {
    return convertToNonExistentStream((response: UserStream), user) //returns Stream 
  };
};

/**
 * Accepts the Response object from fetch, classifies response and returns
 * a User object
 * @param  {[type]} response: Response      [description]
 * @return {[type]}           [description]
 */
export const classifyResponse = (response: Response): PossiblyNestedStreams => {
  /* Needs to understand the various failures that can happen during fetch
   * and how to return a normalized obj(s) w/ null where applicable
   * 4 states:
   * user nonexistent, null stream
   * user offline, null stream
   * user online, stream object
   * streams object
   */

  if (response.status >= 400) { 
    console.log(`Invalid response to GET stream request ${response}`)
    return null
  };

  const body = ((response.json(): any): UndeterminedStreamType); 

  if (body.hasOwnProperty('streams')) {
    return (body: AllStreams)
  } else if ((body: Stream).stream) {
    return body
  } else {
    return handleNullStream(response)
  };
 };

/**
 * fetchUserProfile calls twitchtv api, returns normalized user object
 * @type {Function}
 */
const fetchUserProfile = (user: string): Promise<PossiblyNestedStreams> => {
  const endpoint = streamsUrl + user

  return fetch(new Request(endpoint, options))
    .then(classifyResponse)
};

/**
 * fetchAllProfiles returns an array of promised normalized user objects
 * @type {Function}
 */
const fetchAllProfiles = (users: Array<string>): Promise<Array<Stream>> => {
  return Promise
    .all(...users.map(fetchUserProfile))
    .then(agglomerate)
};

const contentLoadedListener = async (): void => {
  const profiles = await fetchAllProfiles(twitchUser)
};

/* Start
 */
document.addEventListener('DOMContentLoaded', contentLoadedListener);


/* Helper Functions
 */
const agglomerate = (
  userResponses: Array<PossiblyNestedStreams>
): Array<Stream>  => {
  const accumulator = (curr, all) => {
    switch (typeof curr) {
      case 'Array':
        return all.concat(curr)
      case 'Object':
        all.push(curr)
      default:
        break
    }
  }

  return ((userResponses.reduce(accumulator, []): any): Array<Stream>)
};

const extractUserName = (user: UserStream): string => (
  user['_links']['self'].split('/').slice(-1)[0]
);

const convertToNonExistentStream = (user: UserStream): Stream => (
  Object.assign({}, emptyStream, { 
    _id: `
      Error: ${extractUserName(user)} is not a streamer
    `,
  }) 
);

const convertToOfflineStream = (res: UserStream): Stream => (
  Object.assign({}, emptyStream, { 
    _id: `
      Error: ${extractUserName(user)} is offline
    `,
  }) 
);
