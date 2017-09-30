/* @flow */

declare type ChannelLink = {
  'self': string,
  'follows': string,
  'commercial': string,
  'stream_key': string,
  'chat': string,
  'features': string,
  'subscriptions': string,
  'editors': string,
  'teams': string,
  'videos': string,
};

declare type Preview = {
  'small': string,
  'medium': string,
  'large': string,
  'template': string,
};

declare type StreamLink = {
  'self': string,
};

export type NullUser = {
  'error': string,
  'status': number,
  'message': string,
};

export type User = {
  '_id': string | number,
  'bio': string | null,
  'created_at': string,
  'display_name': string,
  'logo': string,
  'name': string,
  'type': string,
  'updated_at': string,
  '_links': Link,
};

export type Channel = {
  'mature': boolean,
  'status': string,
  'broadcaster_language': string,
  'display_name': string,
  'game': string,
  'delay': ?number,
  'language': string,
  '_id': number,
  'name': string,
  'created_at': string,
  'updated_at': string,
  'logo': string,
  'banner': string,
  'video_banner': string,
  'background': ?number,
  'profile_banner': string,
  'profile_banner_background_color': string,
  'partner': boolean,
  'url': string,
  'views': number,
  'followers': number,
  '_links': ChannelLink,
};

export type OptionalChannel = Channel | null;

export type Stream = {
  'game': string,
  'viewers': number,
  'average_fps': number,
  'delay': number,
  'video_height': number,
  'is_playlist': boolean,
  'created_at': string,
  '_id': number | string,
  'channel': Channel,
  'preview': Preview,
  '_links': StreamLink,
};

export type AllStreams = {
  '_total': number,
  'streams': Array<Stream>,
};

export type UndeterminedStreamType = Stream | AllStreams;

export type PossibleStream =
  | { error: true, status: string }
  | { error: false, stream: Stream };

export type PossiblyNestedStreams =
  | PossibleStream
  | Array<PossibleStream>
  | null;

declare type Link = {
  self: string,
  channel: string,
};

export type UserStream = {
  'stream': ?Stream,
  '_links': Link,
};

export type NonExistentUserChannel = {
  'error': string,
  'status': number,
  'message': string,
};

export type MaybeUser = UserStream | null;

export type OfflineOrNonExistentUserStream = {};
