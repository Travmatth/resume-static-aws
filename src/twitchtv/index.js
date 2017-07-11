/* @flow */
import { fetchHandler, toggleFilter } from './Handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const fetchStreams = ((document.querySelector(
      '.fetch-streams',
    ): any): HTMLButtonElement);
    const all = ((document.querySelector(
      '#filter-all',
    ): any): HTMLButtonElement);
    const online = ((document.querySelector(
      '#filter-online',
    ): any): HTMLButtonElement);
    const offline = ((document.querySelector(
      '#filter-offline',
    ): any): HTMLButtonElement);

    fetchStreams.addEventListener(
      'click',
      fetchHandler(document.querySelector('ul.twitch-table')),
    );
    all.addEventListener('click', toggleFilter('all'));
    online.addEventListener('click', toggleFilter('online'));
    offline.addEventListener('click', toggleFilter('offline'));
  });
}
