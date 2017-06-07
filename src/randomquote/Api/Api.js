import { serialize, json, checkHeaders } from 'common/utils';

const fetchQuote = () => {
  //Proxying call to avoid jsonp && CORS restrictions
  const opts = {
    lang: 'en',
    key: '111111',
    format: 'json',
    method: 'getQuote',
  };

  const url = serialize('http://api.forismatic.com/api/1.0/', opts);

  return fetch('/quote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
    .then(checkHeaders)
    .then(response => ({
      quote: response.quoteText,
      author: response.quoteAuthor || 'Author Unknown',
    }))
    .catch(error => {
      console.error(error);
      return null;
    });
};

const createLink = (quote: string, author: string) =>
  serialize('https://twitter.com/intent/tweet', {
    hashtags: 'quotes',
    related: 'freecodecamp',
    text: `"${quote}" ~${author}`,
  });

export { fetchQuote, createLink };
