/* @flow */

import type { 
  OptionalChannel,
  Stream, 
  AllStreams, 
  Channel, 
  NullChannel 
} from './twitchtv.types';

import { TWITCH_TV_API_KEY, } from '../common/api_keys';
import { users, streamsUrl, channelUrl, EmptyStream, } from './constants';
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

const channelVerification = (user: string): OptionalChannel => {
  const endpoint = channelUrl + user

  return fetch(new Request(endpoint, options))
    .then(/*#TODO: write res process logic */)
};

const handleNullStream = async (res: Response): Stream => {
  //If stream is null this could either be due to:
  //a nonexistent user || an offline user
  //additional call to channel route is needed
  const user = '' //#TODO: Scaffolding
  const userState = await channelVerification(user)

  switch (typeof userState.status) {
    case 'number':
      return convertToNonExistentStream(response)
    case 'string':
      return convertToOfflineStream(response)
    default:
      console.error('Unrecognized GET /channel/:channel response', userState)
  };
};

/**
 * Accepts the Response object from fetch, classifies response and returns
 * a User object
 * @param  {[type]} response: Response      [description]
 * @return {[type]}           [description]
 */
export const classifyResponse = (response: Response): Stream => {
  /* Needs to understand the various failures that can happen during fetch
   * and how to return a normalized obj(s) w/ null where applicable
   * 4 states:
   * user nonexistent, null stream
   * user offline, null stream
   * user online, stream object
   * streams object
   */

  if (response.hasOwnProperty('streams')) {
    return convertToStreamArray(response)
  } else {
    response.stream
      ? return convertToStream(response)
      : return handleNullStream(response)
  }
 };

/**
 * fetchUserProfile calls twitchtv api, returns normalized user object
 * @type {Function}
 */
const fetchUserProfile = (user: string): Promise<Stream> => {
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
  const profiles = await fetchAllProfiles(user)
};

/* Start
 */
document.addEventListener('DOMContentLoaded', contentLoadedListener);


/* Helper Functions
 */
const agglomerate = (userResponses: PossiblyNestedStreams): Array<Stream>  => {
  const accumulator = (curr, all) => {
    switch (typeof curr) {
      case 'Array':
        return all.concat(curr)
      default:
        all.push(curr)
    }
  }

  return (userResponses.reduce(accumulator, []): any): Array<Stream>)
};

const convertToStream = (res: Response): Stream => ();
const convertToStreamArray = (res: Response): Array<Stream> => ();
const convertToNonExistentStream = (res: Response): Stream => ();
const convertToOfflineStream = (res: Response): Stream => ();
