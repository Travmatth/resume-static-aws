/* @flow */
import type { UserStream } from '../twitchtv.types';

const extractUserName = (user: UserStream): string => {
  return user['_links']['self'].split('/').slice(-1)[0];
};

const STREAMS_URL = 'https://api.twitch.tv/kraken/streams/';
const USERS_URL = 'https://api.twitch.tv/kraken/users/';
const USERS = [
  '' /* call current streamers api */,
  'freecodecamp',
  'noobs2ninjas',
  'RobotCaleb',
  'OgamingSC2',
  'comster404',
  'cretetion',
  'storbeck',
  'habathcx',
  'brunofin',
  'ESL_SC2',
];

export { STREAMS_URL, USERS_URL, USERS, extractUserName };
