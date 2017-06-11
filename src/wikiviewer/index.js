/* @flow */

import {
  keypressHandler,
  typeHandler,
  searchHandler,
  randomHandler,
} from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const query: Array<string> = [];

    const search = ((document.getElementById(
      'search-btn',
    ): any): HTMLButtonElement);
    const random = ((document.getElementById(
      'random-btn',
    ): any): HTMLButtonElement);
    const searchText = ((document.getElementById(
      'search-text',
    ): any): HTMLInputElement);

    // Each Result has it's own heading
    const headings = ((document.querySelectorAll(
      'div.heading',
    ): any): HTMLCollection<HTMLElement>);
    // Each Result has it's own paragraph
    const paragraphs = ((document.getElementsByTagName(
      'p',
    ): any): HTMLCollection<HTMLParagraphElement>);

    searchText.onkeypress = keypressHandler(query, headings, paragraphs);
    searchText.onchange = typeHandler(query);
    search.onclick = searchHandler(query, headings, paragraphs);
    random.onclick = randomHandler(window);
  });
}
