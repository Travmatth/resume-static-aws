/* @flow */
import { fetchQuote, createLink } from '../Api';

const showScene = (quoteBox: HTMLElement, spinner: HTMLElement) => (
  state: 'loading' | 'quote' | 'error',
) => {
  let quoteHidden;
  let spinnerHidden;

  switch (state) {
    case 'loading':
      quoteHidden = true;
      spinnerHidden = false;
      break;
    case 'quote':
      quoteHidden = false;
      spinnerHidden = true;
      break;
    default:
      quoteHidden = true;
      spinnerHidden = true;
      break;
  }

  quoteBox.classList.toggle('hidden', quoteHidden);
  spinner.classList.toggle('hidden', spinnerHidden);
};

const dismissError = (modal: HTMLElement) => (_: Event) =>
  modal.classList.toggle('is-active', false);

const showError = (modal: HTMLElement) => (message: string) =>
  modal.classList.toggle('is-active', true);

const fetchQuoteHandler = (
  quoteElement: HTMLElement,
  authorElement: HTMLElement,
  tweetLink: HTMLAnchorElement,
  showError: () => void,
  show: () => void,
) => async (_: Event) => {
  show('loading');

  try {
    const { quote, author } = await fetchQuote();
    quoteElement.textContent = quote;
    authorElement.textContent = author;
    tweetLink.href = createLink(quote, author);
  } catch (error) {
    console.error('Proxied fetch failed', error);
    showError();
  }

  show('quote');
};

export { fetchQuoteHandler, dismissError, showError, showScene };
