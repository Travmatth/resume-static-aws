/* @flow */
import { keyPressHandler, dismissPopupHandler } from './Handlers';
import { eventType } from 'common/js/utils';

const modalElements = ['#error-modal', '.modal-close', '.modal-background'];

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();

    // Handlers to handle calculator presses
    document
      .querySelectorAll('[data-key]')
      .forEach(el =>
        el.addEventListener(
          type,
          keyPressHandler(document.querySelector('h2.window')),
        ),
      );

    // Handlers to dismiss modals
    modalElements.forEach(selector =>
      document
        .querySelector(selector)
        .addEventListener(
          type,
          dismissPopupHandler(document.querySelector('.modal')),
        ),
    );
  });
}
