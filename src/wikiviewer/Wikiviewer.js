export default class WikiViewer {
  query: Array<string>;
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

  search() {
    const { query } = this;
    if (!query.length === 0) return;

    params['gsrsearch'] = query.join('');
    return fetch(serialize(endpoint, params))
      .then(this.checkHeaders)
      .then(this.processWikis)
      .catch(err => null);
  }

  randomSearch() {
    window.location = 'https://en.wikipedia.org/wiki/Special:Random';
  }

  async enter(event: Event) {
    if (event.key === 'Enter') {
      this.updateDOM(await this.search());
    } else if (event.key === 'Backspace' && this.query.length > 0) {
      this.query = this.query.slice(0, -1);
    }
  }

  type(event: Event) {
    this.query.push(((event.target: any): HTMLInputElement).value);
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