/* @flow */
import { serialize } from '../common/utils' 

document.addEventListener('DOMContentLoaded', () =>  {
  console.log('wikiviewer.js')

  const randomButton = document//.queryNode(className="random-button") 
  const searchButton = document//.queryNode(className="random-button") 
  const searchInput = document//.queryNode('input')

  searchInput.value = searchText
  searchInput.onChange = this.type
  searchInput.onKeyPress = this.enter
  searchButton.addEventListener('onclick', search) = document//.queryNode(className="random-button") 
});

export class WikiViewer {
  constructor() {
    this.state = []
  }

  handleEvent(event: Event) {}

  search() {
    const { searchText } = this.state
    if (!searchText) return;

    const component = this
    params['gsrsearch'] = searchText

    return fetch(serialize(endpoint, params))
      .then(checkHeaders)
      .then(processWikis)
      .then(updateDOM)
  }

  updateSearchText() {}

  randomSearch() => {
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  }

  enter(e) {
    if (e.key === 'Enter') this.search()
  }

  type(e) {
    // this.setState({ searchText: e.target.value }) 
  }

  updateDOM({ searchText, searchResults, }) {
    const domNodes = document.querySelectorAll('')

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

  checkHeaders(response) {
    if (response.status >= 400) { 
      const error = new Error(`Invalid server response: ${status}`)
      error.response = response
      throw error
    }
    return response.json()
  }

  processWikis(json) {
    Object.values(json.query.pages).map(wiki => ({
      page: wiki.pageid,
      title: wiki.title,
      extract: wiki.extract,
    }))
  }
}
