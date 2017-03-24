import { endpoint, params } from './wikiviewer.constants';
import type { WikiSearchResult, WikiPage, WikiInit } from './wikiviewer.types';
import { serialize, ResponseError } from '../common/utils';

export default class WikiViewer {
  query: Array<string>;
  searchInput: HTMLInputElement;
  randomButton: HTMLButtonElement;
  searchButton: HTMLButtonElement;
  nodes: HTMLCollection<HTMLElement>;

  constructor() {
    this.query = [];
  }

  updateDOM(
    searchResults: ?Array<WikiPage>,
    headings: HTMLCollection<HTMLElement>,
    paragraphs: HTMLCollection<HTMLParagraphElement>,
  ) {
    if (searchResults) {
      let node, result, imgNode;
      for (var i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];
        result = searchResults[i];
        //$FlowIgnore: Not sure how to access idiomatically
        imgNode = (node.child[0].child[1]: HTMLAnchorElement);

        imgNode.href = `https://en.wikipedia.org/?curid=${result.pageid}`;
        //$FlowIgnore: Not sure how to access idiomatically
        node.child[0].child[0].textContent = result.title;
        //$FlowIgnore: Not sure how to access idiomatically
        node.child[1].textContent = result.extract.replace(
          /may refer to:/,
          'disambiguation',
        );
      }
    }
  }

  search(
    headings: HTMLCollection<HTMLElement>,
    paragraphs: HTMLCollection<HTMLParagraphElement>,
  ) {
    const { query } = this;
    if (!query.length === 0) return;

    params['gsrsearch'] = query.join('');
    return fetch(serialize(endpoint, params))
      .then(checkHeaders)
      .then(processWikis)
      .catch(err => null);
  }

  randomHandler(win: Window) {
    return () => {
      winw.location = 'https://en.wikipedia.org/wiki/Special:Random';
    };
  }

  searchHandler(
    headings: HTMLCollection<HTMLElement>,
    paragraphs: HTMLCollection<HTMLParagraphElement>,
  ) {
    return () => {
      this.refreshResults(headings, paragraphs);
    };
  }

  async refreshResults(
    headings: HTMLCollection<HTMLElement>,
    paragraphs: HTMLCollection<HTMLParagraphElement>,
  ) {
    this.updateDOM(await this.search(), headings, paragraphs);
  }

  keypressHandler(
    headings: HTMLCollection<HTMLElement>,
    paragraphs: HTMLCollection<HTMLParagraphElement>,
  ) {
    return async (event: Event) => {
      if (event.key === 'Enter') {
        this.refreshResults(headings, paragraphs);
      } else if (event.key === 'Backspace' && this.query.length > 0) {
        this.query = this.query.slice(0, -1);
      }
    };
  }

  type(event: Event) {
    this.query.push(((event.target: any): HTMLInputElement).value);
  }
}

export function checkHeaders(response: Response) {
  if (response.status >= 400)
    throw new ResponseError('WikiViewer fetch failed', response);
  return ((response.json(): any): Promise<WikiSearchResult>);
}

export function processWikis({ query: { pages } }: WikiSearchResult) {
  const { limits, ...wikis } = pages;
  return Object.keys(wikis);
}
