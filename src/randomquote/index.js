/* @flow */
import {
  fetchQuoteHandler,
  dismissError,
  showError,
  showScene,
} from './Handlers';
import { eventType } from 'common/js/Utils';

const errorElements = ['.modal', '.modal-content', '.modal-close'];

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    const type = eventType();
    const errorModal = document.querySelector('.modal');
    const dismiss = dismissError(errorModal);

    const show = showScene(
      document.querySelector('.quote-box'),
      document.querySelector('.spinner'),
    );

    errorElements.forEach(el =>
      document.querySelector(el).addEventListener(type, dismiss),
    );

    document
      .getElementById('refresh')
      .addEventListener(
        'click',
        fetchQuoteHandler(
          document.querySelector('.quote'),
          document.querySelector('.author'),
          document.querySelector('.tweet'),
          showError(errorModal),
          show,
        ),
      );
  });
