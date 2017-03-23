/* @flow */
import type { WikiSearchResult, WikiPage, WikiInit } from './wikiviewer.types';
import { serialize, ResponseError } from '../common/utils';
import { endpoints, params } from './wikiviewer.constants';

if (process.env.NODE_ENV !== 'ava') {
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = ((document: any): HTMLButtonElement);
    const randomButton = ((document: any): HTMLButtonElement);
    const searchInput = ((document: any): HTMLInputElement);
    const nodes = ((document: any): HTMLCollection<HTMLElement>);
    const wikiView = new WikiViewer(
      searchButton,
      randomButton,
      searchInput,
      nodes,
    );

    searchInput.onchange = wikiView.type;
    searchInput.onkeypress = wikiView.enter;
    searchButton.addEventListener('onclick', wikiView.search);
  });
}

export class WikiViewer {
  searchInput: HTMLInputElement;
  randomButton: HTMLButtonElement;
  searchButton: HTMLButtonElement;
  nodes: HTMLCollection<HTMLElement>;

  constructor(
    searchButton: HTMLButtonElement,
    randomButton: HTMLButtonElement,
    searchInput: HTMLInputElement,
    nodes: HTMLCollection<HTMLElement>,
  ) {
    this.query = [];
    this.searchButton = searchButton;
    this.randomButton = randomButton;
    this.searchInput = searchInput;
    this.nodes = nodes;
  }

  updateDOM(searchResults: ?Array<WikiPage>) {
    if (searchResults) {
      let node, result, imgNode;
      for (var i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];
        result = searchResults[i];
        imgNode = (node.child[0].child[1]: HTMLAnchorElement);

        imgNode.href = `https://en.wikipedia.org/?curid=${result.pageid}`;
        node.child[0].child[0].textContent = result.title;
        node.child[1].textContent = result.extract.replace(
          /may refer to:/,
          'disambiguation',
        );
      }
    }
  }

  search(event: Event) {
    const { query } = this;
    if (!query.length === 0) return;

    params['gsrsearch'] = query.join('');
    return fetch(serialize(endpoint, params))
      .then(checkHeaders)
      .catch(err => null)
      .then(processWikis);
  }

  randomSearch() {
    window.location = 'https://en.wikipedia.org/wiki/Special:Random';
  }

  async enter(event: Event) {
    if (event.key === 'Enter' && wikis) {
      this.updateDOM(await this.search());
    } else if (event.key === 'Backspace' && wikis.length > 0) {
      this.query = this.query.slice(0, -1);
    }
  }

  type(event: Event) {
    this.query.push(e.target.value);
  }

  checkHeaders(response: Response) {
    if (response.status >= 400)
      throw new ResponseError('WikiViewer fetch failed', response);
    return ((response.json(): any): Promise<WikiSearchResult>);
  }

  processWikis({ query: { pages } }: WikiSearchResult) {
    const { limits, ...wikis } = pages;
    return Object.keys(wikis);
  }
}
