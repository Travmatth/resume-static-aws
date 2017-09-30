/* @flow */
import fetchJsonp from 'fetch-jsonp';
import { RANDOMQUOTE_PROXY } from 'protected/proxies';
import { serialize, checkHeaders, withTimeout } from 'common/js/utils';

const DEFAULT_TIMEOUT = 7500;

//Proxying call to avoid jsonp && CORS restrictions
const fetchQuote = (timeout: number = DEFAULT_TIMEOUT) =>
  withTimeout(fetch(RANDOMQUOTE_PROXY), timeout)
    .then(checkHeaders)
    .then(response => ({
      quote: response.quoteText,
      author: response.quoteAuthor || 'Author Unknown',
    }));

const createLink = (quote: string, author: string) =>
  serialize('https://twitter.com/intent/tweet', {
    hashtags: 'quotes',
    related: 'freecodecamp',
    text: `"${quote}" ~${author}`,
  });

export { fetchQuote, createLink, DEFAULT_TIMEOUT };
