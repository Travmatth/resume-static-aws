/* @flow */
import WikiViewer from './Handlers';

export const register = () => {
  const wikiView = new WikiViewer();

  const search = ((document.getElementById(
    'search-btn',
  ): any): HTMLButtonElement);
  const random = ((document.getElementById(
    'random-btn',
  ): any): HTMLButtonElement);
  const searchText = ((document.getElementById(
    'search-txt',
  ): any): HTMLInputElement);

  // Each Result has it's own heading
  const headings = ((document.getElementsByTagName('h2'): any): HTMLCollection<
    HTMLElement
  >);
  // Each Result has it's own paragraph
  const paragraphs = ((document.getElementsByTagName('p'): any): HTMLCollection<
    HTMLParagraphElement
  >);
  const searchHandler = wikiView.searchHandler(headings, paragraphs);

  searchText.onkeypress = wikiView.keypressHandler(headings, paragraphs);
  searchText.onchange = wikiView.typeHandler;
  search.onclick = searchHandler;
  random.onclick = wikiView.randomHandler(window);
};

if (process.env.NODE_ENV !== 'ava') {
  document.addEventListener('DOMContentLoaded', register);
}
