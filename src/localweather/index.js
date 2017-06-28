/* @flow */
import { toggleTempChangeHandler, fetchHandler } from './Handlers';
import { eventType } from 'common/js/utils';
import { registerToggle } from 'common/js/handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    registerToggle();

    const toggles = document.querySelectorAll('.measurement');
    const header = document.querySelector('.heading');
    const cells = document.querySelectorAll('.cell');
    const fetchBtn = document.querySelector('#fetch-btn');
    const tempToggles = ((document.querySelectorAll('input'): any): NodeList<
      HTMLInputElement
    >);

    const type = eventType();
    const toggle = toggleTempChangeHandler(toggles);

    tempToggles.forEach(elem => {
      elem.addEventListener(type, toggle);
    });
    fetchBtn.addEventListener(type, fetchHandler(header, cells, tempToggles));
    document.fetchBtn = fetchBtn;
  });
}
