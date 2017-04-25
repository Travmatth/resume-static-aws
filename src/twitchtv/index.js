/* @flow */

import { fetchAllProfiles } from './Handlers';

const contentLoadedListener = async () => {
  const profiles = await fetchAllProfiles(twitchUser);
};

document.addEventListener('DOMContentLoaded', contentLoadedListener);
