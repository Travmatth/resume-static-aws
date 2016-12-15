/* @flow */
import { serialize } from '../common/utils'

let cells: ?NodeList<HTMLElement>
const params: Object = { //API Params }

const url = ''  //URL
const content: string = '' //serialize(url, params)

document.addEventListener('DOMContentLoaded', () =>  {
  cells = document.querySelectorAll('.cell')

  setTimeout(() => {
    fetchData()
  }, 500);
});


const fetchData = (): void => {
  // Fetch initial content after delay
  // Should I use JSONP + validation,
  // Or set up proxy on heroku?
  fetch(content)
    .then(parse)
    .then(updateDOM)
}

const parse = (response: Response): Arrary<Object> => {
  //parse responses
}

const updateDOM = (results: Array<Object>): void => {
  results.map(result => {
    if (cells) cells.map(cell => {
      //create cells using info from result

      //make visible
      toggleVisibility(cell)
    })
  })
}

const toggleVisibility = (el: HTMLElement): void => {
  el.match(/hide/)
    ? el.className.replace(/hide/, 'show')
    : el.className.replace(/show/, 'hide')
}
