declare type ChannelLink  = {
  "self": string;
  "follows": string;
  "commercial": string;
  "stream_key": string;
  "chat": string;
  "features": string;
  "subscriptions": string;
  "editors": string;
  "teams": string;
  "videos":string;
};

declare type Preview = {
  "small": string;
  "medium": string;
  "large": string;
  "template": string;
};

declare type StreamLink = {
  "self": string;
};


export type NullChannel = {
  "error": string; 
  "status": number;
  "message": string;
};

export type Channel = {
  "mature": boolean;
  "status": string;
  "broadcaster_language": string;
  "display_name": string;
  "game": string;
  "delay": ?number;
  "language": string;
  "_id": number;
  "name": string;
  "created_at": string;
  "updated_at": string;
  "logo": string;
  "banner": string;
  "video_banner": string;
  "background": ?number;
  "profile_banner": string;
  "profile_banner_background_color": string;
  "partner": boolean;
  "url": string;
  "views": number;
  "followers": number;
  "_links": ChannelLink;  
};

export type OptionalChannel = Channel
  | NullChannel

export type Stream = {
  "game": string;
  "viewers": number;
  "average_fps": number;
  "delay": number;
  "video_height": number;
  "is_playlist": boolean;
  "created_at": string;
  "_id": number;
  "channel": Channel;
  "preview": Preview;
  "_links": StreamLink; 
};

export type AllStreams = {
  "_total": number;
  "streams": Array<Stream>;
};

export type PossiblyNestedStreams = Stream
  | Array<Stream>
