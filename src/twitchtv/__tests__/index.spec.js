/* @flow */
'use strict';

import jsdom from 'jsdom';
import fetchMock from 'fetch-mock';
import {
  validUser,
  nonexistentUser,
  allStreamsCall,
  onlineUserChannel,
  onlineUserStreamCall,
  nonexistentOrOfflineUserStream,
} from './mockdata';
import { ResponseError } from '../../common/utils';

/*
  Models under test
*/

import type {
  UserStream,
  Stream,
  AllStreams,
  UndeterminedStreamType,
  PossiblyNestedStreams,
} from '../twitchtv.types';
import { TWITCH_TV_API_KEY } from '../../common/api_keys';
import {
  userUrl,
  users,
  streamsUrl,
  emptyStream,
  createEmptyStream,
} from '../Handlers/constants';
import { serialize } from '../../common/utils';

import {
  verifyUser,
  handleNullStream,
  classifyResponse,
  fetchAllProfiles,
  agglomerate,
  extractUserName,
} from '../Handlers';

/*
  Setup
*/

test('after', () => {
  fetchMock.restore();
});

/*
  Test
*/

test('createEmptyStream should do so', async () => {
  const user = 'fasdf';

  expect(createEmptyStream(true, user)).toEqual(
    Object.assign({}, emptyStream, {
      _id: `ERROR:${user} is offline`,
    }),
  );

  expect(createEmptyStream(false, user)).toEqual(
    Object.assign({}, emptyStream, {
      _id: `ERROR:${user} is not a streamer`,
    }),
  );
});

test('verifyUser should return false if 404 response', async () => {
  const user = 'fasdf';
  fetchMock.get(userUrl + user, { status: 404, body: {} });

  expect(await verifyUser(user)).toBe(false);
});

test('verifyUser should return false if error response', async () => {
  const user = 'fasdf';
  fetchMock.get(userUrl + user, { body: nonexistentUser(user) });

  expect(await verifyUser(user)).toBe(false);
});

test('verifyUser should return true if user exists', async () => {
  const user = 'RobotCaleb';
  fetchMock.get(userUrl + user, { body: onlineUserChannel(user) });

  const exists = await verifyUser(user);
  expect(exists).toBe(true);
});

test('handleNullStream should return emptyStream if user is offline', async () => {
  const user = 'test_channel';
  fetchMock.get(userUrl + user, { body: onlineUserChannel(user) });

  const stream = await handleNullStream(nonexistentOrOfflineUserStream(user));
  expect(stream._id).toBe(`ERROR:${user} is offline`);
});

test('handleNullStream should return emptyStream if user is nonexistent', async () => {
  const user = 'brunofin';
  const url = userUrl + user;
  const body = nonexistentUser(user);
  fetchMock.get(url, { body });

  const stream = await handleNullStream(nonexistentOrOfflineUserStream(user));
  expect(stream._id).toBe(`ERROR:${user} is not a streamer`);
});

test('classifyResponse should return null if 404 response', async () => {
  expect(await classifyResponse((({ status: 404 }: any): Response))).toBe(null);
});

test('classifyResponse can return allStreams', async () => {
  // const user = "brunofin"
  const response = (({
    json() {
      return allStreamsCall;
    },
    status: 200,
  }: any): Response);

  expect(await classifyResponse(response)).toBe(allStreamsCall.streams);
});

test('classifyResponse can return Stream', async () => {
  const user = 'freecodecamp';
  const onlineUser = onlineUserStreamCall(user);
  const response = (({
    json() {
      return onlineUser;
    },
    status: 200,
  }: any): Response);

  expect(await classifyResponse(response)).toBe(onlineUser);
});

test('classifyResponse can return emptyStream if user is nonexistent', async () => {
  const user = 'brunofin';
  fetchMock.get(userUrl + user, {
    status: 404,
    body: nonexistentUser(user),
  });

  const response = (({
    json() {
      return nonexistentOrOfflineUserStream(user);
    },
    status: 200,
  }: any): Response);

  expect(await classifyResponse(response)).toEqual(
    Object.assign({}, emptyStream, { _id: `ERROR:${user} is not a streamer` }),
  );
});

test('classifyResponse can return emptyStream if user is offline', async () => {
  const user = 'OgamingSC2';
  fetchMock.get(userUrl + user, {
    status: 404,
    body: validUser(user),
  });

  const response = (({
    json() {
      return nonexistentOrOfflineUserStream(user);
    },
    status: 200,
  }: any): Response);

  expect(await classifyResponse(response)).toEqual(
    Object.assign({}, emptyStream, { _id: `ERROR:${user} is not a streamer` }),
  );
});

test('fetchAllProfiles should return Array<Promise<Stream>>', async () => {
  const onlineStreams = [
    'freecodecamp',
    'noobs2ninjas',
    'RobotCaleb',
    'OgamingSC2',
  ];
  const offlineStreams = ['comster404', 'cretetion', 'storbeck', 'habathcx'];
  const nonexistentStreams = ['brunofin', 'ESL_SC2'];

  //all streamers requires only 1 api call, to fetch all streams
  fetchMock.get(streamsUrl, allStreamsCall);
  const allStreamers = allStreamsCall['streams'];

  //online streamers require only 1 api call, to fetch their stream
  let onlineStreamers = [];
  onlineStreams.map(user => {
    fetchMock.get(streamsUrl + user, { body: onlineUserStreamCall(user) });
    onlineStreamers.push(onlineUserStreamCall(user));
  });

  //offline streamers require 2 api calls, to fetch their stream & valid user
  let offlineStreamers = [];
  offlineStreams.map(user => {
    const res = nonexistentOrOfflineUserStream(user);
    fetchMock.get(streamsUrl + user, { body: res });
    fetchMock.get(userUrl + user, { body: validUser(user) });
    offlineStreamers.push(createEmptyStream(true, user));
  });

  //offline streamers require 2 api calls
  let nonexistentStreamers = [];
  nonexistentStreams.map(user => {
    const res = nonexistentOrOfflineUserStream(user);
    fetchMock.get(streamsUrl + user, { body: res }); // fetch stream
    fetchMock.get(userUrl + user, { body: nonexistentUser(user) }); // nonexistent user
    nonexistentStreamers.push(createEmptyStream(false, user));
  });

  expect(await fetchAllProfiles(users)).toEqual([
    ...allStreamers,
    ...onlineStreamers,
    ...offlineStreamers,
    ...nonexistentStreamers,
  ]);
});

test('agglomerate should reduce all PossiblyNestedStreams types into Array<Stream>', async () => {
  const arr = ((allStreamsCall.streams: any): Array<Stream>);
  const obj = ((onlineUserStreamCall('kraken'): any): Stream);
  const pre = [arr, obj, null];
  const post = [...arr, obj];

  expect(agglomerate(pre)).toEqual(post);
});

test('extractUserName should do so', async () => {
  const name = '187gmhouh';

  expect(name).toBe(extractUserName(nonexistentOrOfflineUserStream(name)));
});
