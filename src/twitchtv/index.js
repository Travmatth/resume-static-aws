/* @flow */

import { fetchAllProfiles, users } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', async () => {
    const profiles = await fetchAllProfiles(users);
  });
}
