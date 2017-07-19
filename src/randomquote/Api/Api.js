/* @flow */
import fetchJsonp from 'fetch-jsonp';
import { RANDOMQUOTE_PROXY } from 'protected/proxies';
import { serialize, json, checkHeaders } from 'common/js/utils';

const fetchQuote = () => {
  //Proxying call to avoid jsonp && CORS restrictions
  return fetch(RANDOMQUOTE_PROXY)
    .then(checkHeaders)
    .then(response => ({
      error: null,
      quote: response.quoteText,
      author: response.quoteAuthor || 'Author Unknown',
    }))
    .catch(error => ({
      error,
      quote: null,
      author: null,
    }));
};

const createLink = (quote: string, author: string) =>
  serialize('https://twitter.com/intent/tweet', {
    hashtags: 'quotes',
    related: 'freecodecamp',
    text: `"${quote}" ~${author}`,
  });

export { fetchQuote, createLink };
