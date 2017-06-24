/* @flow */
import fetchJsonp from 'fetch-jsonp';
import proxyUrl from 'protected/randomquote';
import { serialize, json, checkHeaders } from 'common/js/utils';

const fetchQuote = () => {
  //Proxying call to avoid jsonp && CORS restrictions
  return fetch(proxyUrl)
    .then(checkHeaders)
    .then(response => ({
      error: false,
      quote: response.quoteText,
      author: response.quoteAuthor || 'Author Unknown',
    }))
    .catch(error => ({
      error,
      quote: '',
      author: '',
    }));
};

const createLink = (quote: string, author: string) =>
  serialize('https://twitter.com/intent/tweet', {
    hashtags: 'quotes',
    related: 'freecodecamp',
    text: `"${quote}" ~${author}`,
  });

export { fetchQuote, createLink };
