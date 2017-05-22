/* @flow */
import { fetchQuoteHandler } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('quotebox');
    const tweet = document.querySelector('.tweet');
    const nextQuote = fetchQuoteHandler(container, tweet);
    document.getElementById('refresh').addEventListener('click', nextQuote);
  });
}
