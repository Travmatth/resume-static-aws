/* @flow */
import { fetchQuote, createLink } from '../Api';

const fetchQuoteHandler = (
  container: HTMLElement,
  tweetLink: HTMLElement,
) => async (_: Event) => {
  const { quote, author } = await fetchQuote();
  container.children[0].textContent = quote;
  container.children[1].textContent = author;
  tweetLink.textContent = createLink(quote, author);
};

export { fetchQuoteHandler };
