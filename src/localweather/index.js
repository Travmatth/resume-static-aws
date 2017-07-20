/* @flow */
import { fetchHandler, dispatchToggleEvent } from './Handlers';
import { eventType } from 'common/js/utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();
    const span = document.querySelector('.heading');
    const tbody = document.querySelector('tbody');
    const table = document.querySelector('table');

    // radio buttons should dispatch TOGGLE_EVENT to table cells on click
    document
      .querySelectorAll('input')
      .forEach(elem =>
        elem.addEventListener(type, dispatchToggleEvent(elem.dataset.type)),
      );

    document
      .querySelector('#fetch-btn')
      .addEventListener(type, fetchHandler(span, tbody, table));
  });
}
