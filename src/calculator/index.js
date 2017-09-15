/* @flow */
import {
  refreshHandler,
  keyPressHandler,
  dismissPopupHandler,
  displayPopup,
} from './Handlers';
import { Calculator } from './Models';
import { eventType } from 'common/js/utils';

const modalElements = ['#error-modal', '.modal-close', '.modal-background'];

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();
    const calculator = new Calculator();

    const modal = document.querySelector('.modal');
    const viewport = document.querySelector('h2.window');
    const error = document.querySelector('#error-modal');

    const refresh = refreshHandler(calculator, viewport);
    const dismiss = dismissPopupHandler(modal);
    const display = displayPopup(modal, error);
    const keypress = keyPressHandler(calculator, refresh, display);

    // Handlers to handle calculator presses
    document
      .querySelectorAll('[data-key]')
      .forEach(el => el.addEventListener(type, keypress));

    // Handlers to dismiss modals
    modalElements.forEach(selector =>
      document.querySelector(selector).addEventListener(type, dismiss),
    );
  });
