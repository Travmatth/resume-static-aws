/* @flow */
import { fetchHandler, toggleFilter, showScene } from './Handlers';

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    // mount point for streamers tiles
    const table = document.querySelector('.twitch-table');

    // manage fetching and display of streamer tiles
    document
      .querySelector('.fetch-streams')
      .addEventListener(
        'click',
        fetchHandler(
          table,
          showScene(
            document.querySelector('.spinner'),
            document.querySelector('.error'),
            table,
          ),
        ),
      );

    // manage displaying of streamer tiles
    document
      .querySelector('#filter-all')
      .addEventListener('click', toggleFilter('all'));

    // manage displaying of online streamer tiles
    document
      .querySelector('#filter-online')
      .addEventListener('click', toggleFilter('online'));

    // manage displaying of offline streamer tiles
    document
      .querySelector('#filter-offline')
      .addEventListener('click', toggleFilter('offline'));
  });
