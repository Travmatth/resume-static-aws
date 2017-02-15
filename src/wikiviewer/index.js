/* @flow */
import type { WikiSearchResult, WikiPage, WikiInit, } from './wikiviewer.types'
import { serialize, ResponseError, } from '../common/utils' 
import { endpoints, params, } from './wikiview.constants' 

document.addEventListener('DOMContentLoaded', () =>  {
  const searchButton = ((document): any): HTMLButtonElement) 
  const randomButton = ((document): any): HTMLInputElement) 
  const searchInput = ((document): any): HTMLButtonElement)
  const nodes = ((document): any): HTMLCollection<HTMLElement>)

  const wikiViewer = new WikiViewer( 
    searchButton, 
    randomButton, 
    searchInput, 
    nodes
  )

  searchInput.onChange = wikiViewer.type
  searchInput.onKeyPress = wikiViewer.enter
  searchButton.addEventListener('onclick', wikiViewer.search) 
});

export class WikiViewer {
  searchInput: HTMLInputElement;
  randomButton: HTMLButtonElement;
  searchButton: HTMLButtonElement;

  constructor(
    searchButton: HTMLButtonElement,
    randomButton: HTMLInputElement,
    searchInput: HTMLButtonElement,
    nodes: HTMLCollection<HTMLElement>,
  ) {
    this.query = [];
    this.searchButton = searchButton;
    this.randomButton = randomButton;
    this.searchInput = searchInput;
    this.nodes = nodes;
  }

  updateDOM(searchResults: Array<WikiPage>) {
    if (searchResults && this.nodes) {
      Object.values(searchResults).map(wikiPage => {
          // <li key={wiki.page} className="wiki">
          //   <div>
          //      <h2 className="squish">{ wiki.title }  </h2>
          //      <a 
          //        className="squish"  
          //        href={`https://en.wikipedia.org/?curid=${wiki.page}`}> 
          //        Open in Wikipedia
          //      </a>
          //   </div>
          //   <p>{ wiki.extract.replace(/may refer to:/, 'disambiguation') }</p>
          // </li>
          const wikiNode.textContent =  wikiPage.page
          const url = `https://en.wikipedia.org/?curid=${wiki.page}`

          wikiNode.child[0].textContent = 
          wikiNode.child[0].child[0].textContent = wiki.title 
          (wikiNode.child[0].child[1]: HTMLAnchorElement).href = url
          wikiNode.child[1].textContent = wiki.extract.replace(/may refer to:/, 'disambiguation') 
        )
      })
    }
  }

  search(event: Event) {
    const { query } = this
    if (!query.length === 0) return;

    params['gsrsearch'] = query.join('')
    return fetch(serialize(endpoint, params))
      .then(checkHeaders)
      .then(processWikis)
      .then(updateDOM)
  }

  randomSearch() {
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  }

  enter(event: Event) {
    if (event.key === 'Enter')
      this.search()
  }

  type(event: Event) {
    this.query.push(e.target.value)
  }


  checkHeaders(response: Response) {
    if (response.status >= 400)
      throw new ResponseError('WikiViewer fetch failed', response)
    return ((response.json(): any) Promise<WikiSearchResult>)
  }

  processWikis({ query: { pages } }: WikiSearchResult) {
    const { limits, ...wikis } = pages
    return [...wikis]
  }
}
