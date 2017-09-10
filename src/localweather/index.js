/* @flow */
import { fetchHandler, dispatchToggleEvent, showScene } from './Handlers';
import { eventType } from 'common/js/utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();

    const table = document.querySelector('table');
    const tbody = document.querySelector('tbody');
    const span = document.querySelector('.heading');
    const spinner = document.querySelector('.spinner');
    const error = document.querySelector('.error');

    const show = showScene(error, spinner, table);

    // radio buttons should dispatch TOGGLE_EVENT to table cells on click
    document.querySelectorAll('input').forEach(elem => {
      elem.addEventListener(type, dispatchToggleEvent(elem.dataset.type));
    });

    // fetch button accesses browser geolocation & calls api
    const handler = fetchHandler(show, span, tbody);
    document.querySelector('#fetch-btn').addEventListener(type, handler);
  });
}
