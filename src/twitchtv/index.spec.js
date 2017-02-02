/* @flow */

import test from 'ava'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata'
import { ResponseError } from '../common/utils'

/*
  Models under test
*/

import type { 
  UserStream, 
  Stream, 
  AllStreams, 
  UndeterminedStreamType,  
  PossiblyNestedStreams,
} from './twitchtv.types';
import { TWITCH_TV_API_KEY, } from '../common/api_keys';
import { twitchUser, streamsUrl, channelUrl, emptyStream, } from './constants';
import { serialize, } from '../common/utils';

import { 
  verifyUser,
  handleNullStream,
  classifyResponse,
  fetchAllProfiles,
  contentLoadedListener,
  agglomerate,
  extractUserName,
} from './index';

/*
  Setup
*/

test.before(() => {})

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})

/*
  Test
*/

test('verifyUser should', async t => {});
test('handleNullStream should', async t => {});
test('classifyResponse should', async t => {});
test('fetchAllProfiles should', async t => {});
test('contentLoadedListener should', async t => {});
test('agglomerate should', async t => {});
test('extractUserName should', async t => {});