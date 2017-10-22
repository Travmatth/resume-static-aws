/* @flow */
import { fetchHandler, dispatchToggleEvent, showScene } from './Handlers';
import { eventType } from 'common/js/Utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();

    const table = document.querySelector('table');
    const tbody = document.querySelector('tbody');
    const span = document.querySelector('.heading');
    const spinner = document.querySelector('.spinner');
    const err = document.querySelector('.error');

    // radio buttons should dispatch TOGGLE_EVENT to table cells on click
    document.querySelectorAll('input').forEach(elem => {
      elem.addEventListener(type, dispatchToggleEvent(elem.dataset.type));
    });

    // fetch button accesses browser geolocation & calls api
    const handler = fetchHandler(showScene(err, spinner, table), span, tbody);
    document.querySelector('#fetch-btn').addEventListener(type, handler);
  });
}
