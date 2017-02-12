/* @flow */
import type { Wiki } from './wikiviewer.types'
import { serialize, ResponseError, } from '../common/utils' 
import { endpoints, params, } from './wikiview.constants' 

document.addEventListener('DOMContentLoaded', () =>  {
  console.log('wikiviewer.js')

  const wikiViewer = new WikiViewer(document) 
});

export class WikiViewer {
  doc: Document;
  searchInput: HTMLInputElement;
  randomButton: HTMLButtonElement;
  searchButton: HTMLButtonElement;

  constructor(doc: Document) {
    this.doc = doc
    this.state = {
      // Would this work?
      // get query() { return this.searchText.join(''); }
      query: [],
    }

    this.randomButton = ((this.doc): any): HTMLInputElement) 
    this.searchButton = ((this.doc): any): HTMLButtonElement) 
    this.searchInput = ((this.doc): any): HTMLButtonElement)

    searchInput.onChange = this.type
    searchInput.onKeyPress = this.enter
    searchButton.addEventListener('onclick', this.search) 
  }

  handleEvent(event: Event) {
  }

  search(event: Event) {
    const { query } = this.state
    if (!query.length === 0) return;

    params['gsrsearch'] = query.join('')
    return fetch(serialize(endpoint, params))
      .then(checkHeaders)
      .then(processWikis)
      .then(updateDOM)
  }

  randomSearch() => {
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  }

  enter(event: Event) {
    if (event.key === 'Enter')
      this.search()
  }

  type(event: Event) {
    // this.setState({ searchText: e.target.value }) 
  }

  updateDOM({ searchText, searchResults, }) {
    const domNodes = this.doc.querySelectorAll('')

    if (searchResults && domNodes) {
      Object.values(searchResults).map(wiki => {
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
          const wikiNode.textContent =  wiki.page
          wikiNode.child[0].textContent = 
          wikiNode.child[0].child[0].textContent = wiki.title 
          wikiNode.child[0].child[1].href = `https://en.wikipedia.org/?curid=${wiki.page}` 
          wikiNode.child[1].textContent = wiki.extract.replace(/may refer to:/, 'disambiguation') 
        )
      })
    }
  }

  checkHeaders(response: Response) {
    if (response.status >= 400)
      throw new ResponseError('WikiViewer fetch failed', response)
    return ((response.json(): any) Promise<Wiki>)
  }

  processWikis(json: Wiki) {
    return Object.values(json.query.pages).map(wiki => ({
      page: wiki.pageid,
      title: wiki.title,
      extract: wiki.extract,
    }))
  }
}
