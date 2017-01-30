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

const handleNullStream = async (body: UserStream): Stream => {
  // If stream is null this could either be due to:
  // a nonexistent user || an offline user
  // additional call to channel route is needed to determine which case 

  let msg
  const user = extractUserName(body)

  if (await verifyUser(user)) 
    msg = `ERROR:${user} is offline` 
  else 
    msg = `ERROR:${user} is not a streamer`

  return Object.assign({}, emptyStream, { _id: msg }); 
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
    console.log('Invalid response to GET stream request', response)
    return null
  };

  const body = ((response.json(): any): UndeterminedStreamType); 

  if (body.hasOwnProperty('streams')) {
    return (body: AllStreams)
  } else if ((body: Stream).stream) {
    return body
  } else {
    return handleNullStream((body: UserStream))
  };
 };

/**
 * fetchAllProfiles returns an array of promised normalized user objects
 * @type {Function}
 */
const fetchAllProfiles = (users: Array<string>): Promise<Array<Stream>> => {

   // call twitchtv api, return normalized user object
  const fetches = [...users.map((user: string): PossiblyNestedStreams => {
    const endpoint = streamsUrl + user

    return fetch(new Request(endpoint, options))
      .then(classifyResponse)
  })] 

  return Promise
    .all(fetches)
    .then(agglomerate)
};

const contentLoadedListener = async () => {
  const profiles = await fetchAllProfiles(twitchUser)
};

/* Start
 */
document.addEventListener('DOMContentLoaded', contentLoadedListener);


/* Helper Functions
 */
const agglomerate = (userResponses: PossiblyNestedStreams[]): Stream[]  => {
  const accumulator = (curr, all) => {
    if (Array.isArray(curr)) return all.concat(curr)
    else if (typeof curr === 'object') return all.push(curr)
    else return all
  }

  return ((userResponses.reduce(accumulator, []): any): Array<Stream>)
};

const extractUserName = (user: UserStream): string => (
  user['_links']['self'].split('/').slice(-1)[0]
);