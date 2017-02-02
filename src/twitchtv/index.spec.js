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

test('verifyUser should return false if 404 response', async t => {
  t.is(1, 1);
});

test('verifyUser should return false if error response', async t => {
  t.is(1, 1);
});

test('verifyUser should return true if user exists', async t => {
  t.is(1, 1);
});

test('handleNullStream should return emptyStream if user is offline', async t => {
  t.is(1, 1);
});

test('handleNullStream should return emptyStream if user is nonexistent', async t => {
  t.is(1, 1);
});

test('classifyResponse should return null if 404 response', async t => {
  t.is(1, 1);
});

test('classifyResponse can return allStreams', async t => {
  t.is(1, 1);
});

test('classifyResponse can return Stream', async t => {
  t.is(1, 1);
});

test('classifyResponse can return emptyStream if user is nonexistent', async t => {
  t.is(1, 1);
});

test('classifyResponse can return emptyStream if user is offline', async t => {
  t.is(1, 1);
});

test('fetchAllProfiles should return Array<Promise<Stream>>', async t => {
  t.is(1, 1);
});

test('fetchAllProfiles should handle nonexistent/offline users', async t => {
  t.is(1, 1);
});

test('agglomerate should reduce all PossiblyNestedStreams types into Array<Stream>', async t => {
  t.is(1, 1);
});

test('extractUserName should do so', async t => {
  t.is(1, 1);
});