/* @flow */
'use strict';

import { WikiViewer } from './Models';

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
  const headings = ((document.querySelectorAll('div.heading'): any): NodeList<
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

if (global.document !== undefined) {
  document.addEventListener('DOMContentLoaded', register);
}
