/* @flow */
import { fetchQuote, createLink } from '../Api';

const fetchQuoteHandler = (
  container: HTMLElement,
  tweetLink: HTMLAnchorElement,
) => async (_: Event) => {
  const { error, quote, author } = await fetchQuote();
  if (!error) {
    container.children[0].textContent = quote;
    container.children[1].textContent = author;
    tweetLink.href = createLink(quote, author);
  } else {
    console.error('Proxied fetch failed', error);
  }
};

export { fetchQuoteHandler };
