/* @Flow */

export const streamsUrl = 'https://api.twitch.tv/kraken/streams/'

export const channelUrl = ' https://api.twitch.tv/kraken/channels/'

export const users = [ 
  '', /* call current streamers api */ 
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
]

export const EmptyStream = {
  'game': '',
  'viewers': 0,
  'average_fps': 0,
  'delay': 0,
  'video_height': 0,
  'is_playlist': false,
  'created_at': '',
  '_id': 0,
  'channel': {
    'mature': false,
    'status': '',
    'broadcaster_language': '',
    'display_name': '',
    'game': '',
    'delay': 0,
    'language': '',
    '_id': 0,
    'name': '',
    'created_at': '',
    'updated_at': '',
    'logo': '',
    'banner': '',
    'video_banner': '',
    'background': 0,
    'profile_banner': '',
    'profile_banner_background_color': '',
    'partner': false,
    'url': '',
    'views': 0,
    'followers': 0,
    '_links': {
      'self': '',
      'follows': '',
      'commercial': '',
      'stream_key': '',
      'chat': '',
      'features': '',
      'subscriptions': '',
      'editors': '',
      'teams': '',
      'videos':'',
    },  
  },
  'preview': {
    'small': '',
    'medium': '',
    'large': '',
    'template': '',
  },
  '_links': {
    'self': '',
  } 
};
