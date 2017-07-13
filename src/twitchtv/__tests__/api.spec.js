/* @flow */

import {
  validUser,
  nonexistentUser,
  allStreamsCall,
  onlineUserChannel,
  onlineUserStreamCall,
  nonexistentOrOfflineUserStream,
} from './mockdata';
import { ResponseError, serialize } from 'common/js/utils';
import { json } from 'tests/utils';

import type {
  UserStream,
  Stream,
  AllStreams,
  UndeterminedStreamType,
  PossiblyNestedStreams,
} from '../twitchtv.types';
import TWITCH_TV_API_KEY from 'protected/localweather.key';
import { userUrl, users, streamsUrl, extractUserName } from '../Models';

import {
  verifyUser,
  handleNullStream,
  classifyResponse,
  fetchAllProfiles,
  agglomerate,
} from '../Api';

describe('TwitchTV Api', () => {
  afterEach(() => fetch.resetMocks());

  it('verifyUser should return false if 404 response', async () => {
    const user = 'fasdf';
    fetch.mockResponseOnce(json({}), { status: 404 });

    expect(await verifyUser(user)).toBe(false);
  });

  it('verifyUser should return false if error response', async () => {
    const user = 'fasdf';
    fetch.mockResponseOnce(json({ ...nonexistentUser(user) }));

    expect(await verifyUser(user)).toBe(false);
  });

  it('verifyUser should return true if user exists', async () => {
    const user = 'RobotCaleb';
    fetch.mockResponseOnce(json({ body: onlineUserChannel(user) }));

    const exists = await verifyUser(user);
    expect(exists).toBe(true);
  });

  it('handleNullStream should return status if user is offline', async () => {
    const user = 'test_channel';
    fetch.mockResponseOnce(json({ body: onlineUserChannel(user) }));

    const stream = await handleNullStream(nonexistentOrOfflineUserStream(user));
    expect(stream).toBe(`${user} is offline`);
  });

  it('handleNullStream should return status if user is nonexistent', async () => {
    const user = 'brunofin';
    const body = nonexistentUser(user);
    fetch.mockResponseOnce(json(body));

    const stream = await handleNullStream(nonexistentOrOfflineUserStream(user));
    expect(stream).toBe(`${user} is not a streamer`);
  });

  it('classifyResponse should return null if 404 response', async () => {
    expect(await classifyResponse((({ status: 404 }: any): Response))).toBe(
      null,
    );
  });

  it('classifyResponse can return allStreams', async () => {
    const response = (({
      json() {
        return allStreamsCall;
      },
      status: 200,
    }: any): Response);

    const expected = allStreamsCall.streams.map(stream => ({
      error: false,
      stream,
    }));
    expect(await classifyResponse(response)).toEqual(expected);
  });

  it('classifyResponse can return Stream', async () => {
    const onlineUser = onlineUserStreamCall('freecodecamp');
    const response = (({
      json() {
        return onlineUser;
      },
      status: 200,
    }: any): Response);

    expect(await classifyResponse(response)).toEqual({
      error: false,
      stream: onlineUser.stream,
    });
  });

  it('classifyResponse can return error object if user is nonexistent', async () => {
    const user = 'brunofin';
    const body = json({ ...nonexistentUser(user) });
    fetch.mockResponseOnce(body, { status: 404 });
    fetch.mockResponseOnce(body, { status: 200 });

    const response = (({
      json() {
        return nonexistentOrOfflineUserStream(user);
      },
      status: 200,
    }: any): Response);

    expect(await classifyResponse(response)).toEqual({
      error: true,
      status: `${user} is not a streamer`,
    });
  });

  it('classifyResponse can return error stream if user is offline', async () => {
    const user = 'OgamingSC2';
    const body = json({ ...validUser(user) });
    fetch.mockResponseOnce(body, { status: 404 });

    const response = (({
      json() {
        return nonexistentOrOfflineUserStream(user);
      },
      status: 200,
    }: any): Response);

    expect(await classifyResponse(response)).toEqual({
      error: true,
      status: `${user} is not a streamer`,
    });
  });

  it('fetchAllProfiles should return Array<Promise<Stream>>', async () => {
    const onlineStreams = [
      'freecodecamp',
      'noobs2ninjas',
      'RobotCaleb',
      'OgamingSC2',
    ];

    const offlineStreams = ['comster404'];

    fetch.mockResponses(
      [json(onlineUserStreamCall('freecodecamp')), { status: 200 }],
      [json(onlineUserStreamCall('noobs2ninjas')), { status: 200 }],
      [json(onlineUserStreamCall('RobotCaleb')), { status: 200 }],
      [json(onlineUserStreamCall('OgamingSC2')), { status: 200 }],
      [json(nonexistentOrOfflineUserStream('comster404')), { status: 200 }],
      [json(validUser('comster404')), { status: 200 }],
    );

    const streamers = [...onlineStreams, ...offlineStreams];
    expect(await fetchAllProfiles(streamers)).toEqual([
      ...onlineStreams.map(user => ({
        error: false,
        stream: onlineUserStreamCall(user).stream,
      })),
      ...offlineStreams.map(user => ({
        error: true,
        status: `${user} is offline`,
      })),
    ]);
  });

  it('agglomerate should reduce all PossiblyNestedStreams types into Array<Stream>', async () => {
    const arr = ((allStreamsCall.streams: any): Array<Stream>);
    const obj = ((onlineUserStreamCall('kraken'): any): Stream);
    const pre = [arr, obj, null];
    const post = [...arr, obj];

    expect(agglomerate(pre)).toEqual(post);
  });
});
