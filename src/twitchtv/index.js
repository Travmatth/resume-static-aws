/* @flow */
'use strict';

import { fetchAllProfiles, users } from './Handlers';

const contentLoadedListener = async () => {
  const profiles = await fetchAllProfiles(users);
};

document.addEventListener('DOMContentLoaded', contentLoadedListener);
