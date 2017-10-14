/* @flow */
/* eslint-env jest */

import {
  validUser,
  nonexistentUser,
  allStreamsCall,
  onlineUserChannel,
  onlineUserStreamCall,
  nonexistentOrOfflineUserStream,
} from './mockdata';
import { json } from 'tests/utils';

import type { Stream } from '../twitchtv.types';
import * as Models from '../Models';

import {
  verifyUser,
  handleNullStream,
  classify,
  fetchAllProfiles,
  agglomerate,
  fetchProfile,
} from '../Api';
import * as Utils from 'common/js/utils';

jest.mock('common/js/utils', () => {
  const module = require.requireActual('common/js/utils');
  const original = module.withTimeout;

  return Object.assign(module, {
    originalWithTimeout: original,
    mockWithTimeout: jest.fn(),
    withTimeout: jest.fn(),
  });
});

jest.mock('../Models', () => ({
  ...require.requireActual('../Models'),
  OFFLINE_STREAMS: ['comster404'],
  ONLINE_STREAMS: ['freecodecamp', 'noobs2ninjas', 'RobotCaleb', 'OgamingSC2'],
  get USERS() {
    return [...this.ONLINE_STREAMS, ...this.OFFLINE_STREAMS];
  },
}));

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

  it('classify should return null if 404 response', async () => {
    expect(await classify((({ status: 404 }: any): Response))).toBe(null);
  });

  it('classify can return allStreams', async () => {
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
    expect(await classify(response)).toEqual(expected);
  });

  it('classify can return Stream', async () => {
    const onlineUser = onlineUserStreamCall('freecodecamp');
    const response = (({
      json() {
        return onlineUser;
      },
      status: 200,
    }: any): Response);

    expect(await classify(response)).toEqual({
      error: false,
      stream: onlineUser.stream,
    });
  });

  it('classify can return error object if user is nonexistent', async () => {
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

    expect(await classify(response)).toEqual({
      error: true,
      status: `${user} is not a streamer`,
    });
  });

  it('classify can return error stream if user is offline', async () => {
    const user = 'OgamingSC2';
    const body = json({ ...validUser(user) });
    fetch.mockResponseOnce(body, { status: 404 });

    const response = (({
      json() {
        return nonexistentOrOfflineUserStream(user);
      },
      status: 200,
    }: any): Response);

    expect(await classify(response)).toEqual({
      error: true,
      status: `${user} is not a streamer`,
    });
  });

  it('fetchAllProfiles should return Array<Promise<Stream>>', async () => {
    Utils.withTimeout = Utils.originalWithTimeout;
    fetch.mockResponses(
      [json(onlineUserStreamCall('freecodecamp')), { status: 200 }],
      [json(onlineUserStreamCall('noobs2ninjas')), { status: 200 }],
      [json(onlineUserStreamCall('RobotCaleb')), { status: 200 }],
      [json(onlineUserStreamCall('OgamingSC2')), { status: 200 }],
      [json(nonexistentOrOfflineUserStream('comster404')), { status: 200 }],
      [json(validUser('comster404')), { status: 200 }],
    );

    expect(await fetchAllProfiles()).toEqual([
      ...Models.ONLINE_STREAMS.map(user => ({
        error: false,
        stream: onlineUserStreamCall(user).stream,
      })),
      ...Models.OFFLINE_STREAMS.map(user => ({
        error: true,
        status: `${user} is offline`,
      })),
    ]);
  });

  it('fetchProfile should return null on classify fail', async () => {
    Utils.withTimeout = Utils.originalWithTimeout;
    fetch.mockResponseOnce(json({}), { status: 404 });
    expect(await fetchProfile('test')).toBe(null);
  });

  it('fetchProfile should return null on withTimeout fail', async () => {
    Utils.withTimeout = Utils.mockWithTimeout.mockImplementationOnce(() =>
      Promise.reject('error'),
    );

    expect(await fetchProfile('test')).toBe(null);
  });
  it('agglomerate should throw on network fail', () => {
    Utils.withTimeout = Utils.originalWithTimeout;
    expect(() => agglomerate([null, null])).toThrow();
  });

  it('agglomerate should reduce all PossiblyNestedStreams types into Array<Stream>', async () => {
    Utils.withTimeout = Utils.originalWithTimeout;
    const arr = ((allStreamsCall.streams: any): Array<Stream>);
    const obj = ((onlineUserStreamCall('kraken'): any): Stream);
    const pre = [arr, obj, null];
    const post = [...arr, obj];

    expect(agglomerate(pre)).toEqual(post);
  });
});
