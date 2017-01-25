/* @flow */

import { 
  serialize, 
  // dateString, 
  // appendSuffix, 
  ResponseError,
} from '../common/utils';
import { /*TWITCH_TV_API_KEY,*/ } from '../common/api_keys';
// import { userUrls } from './constants';
import { User } from './twitchtv.types';

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

/* Network calls
 */

/**
 * fetchUserProfile calls twitchtv api, returns normalized user object
 * @type {Function}
 */
const fetchUserProfile = (user: string): Promise<User> => {
  /* Needs to understand the various failures that can happen during fetch
   * and how to return a normalized obj w/ null where applicable
   */
};

/**
 * fetchAllProfiles returns an array of promised normalized user objects
 * @type {Function}
 */
const fetchAllProfiles = (users: Array<string>): Array<Promise<User>> => {
  return Promise.all(...users.map(fetchUserProfile))
};

const contentLoadedListener = async (): void => {
  const profiles = await fetchAllProfiles(/*userUrls*/)
};

/* Start
 */
document.addEventListener('DOMContentLoaded', contentLoadedListener);
