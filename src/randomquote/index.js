/* @flow */
import { fetchQuoteHandler } from './Handlers';
import { registerToggle } from 'common/js/handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    registerToggle();
    const container = ((document.getElementById('quotebox'): any): HTMLElement);
    const tweet = ((document.querySelector('.tweet'): any): HTMLAnchorElement);
    const nextQuote = fetchQuoteHandler(container, tweet);
    ((document.getElementById('refresh'): any): HTMLElement).addEventListener(
      'click',
      nextQuote,
    );
  });
}
