/* @flow */
import { serialize } from '../common/utils'
import { parseTime } from './constants'

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
  try {
    // mixed content restrictions (can't request http on https page)
    // Should I use JSONP + validation,
    // Or set up proxy on heroku?
    fetch('', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    .then(checkResponseHeaders)
    .then(processResponse)
    .then(updateDOM)

  } catch(error) {
    console.error('fetch / parsing failed:\n', error)
  }
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

const parameters = {
  'lat': lat,
  'lon': lon,
  'units': 'imperial',
  'APPID': 'c26ef1df98c449f37f8f199738ce74c7',
}

const endpoint = 'http://api.openweathermap.org/data/2.5/forecast' 
const url = endpoint.serialize(parameters)


export const convert = temp => Math.round(temp * 1.8 + 32)

export const processForecasts = outlook => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: outlook.rain && outlook.rain['3h'] || null,
  snow: outlook.snow && outlook.snow['3h'] || null,
  description: outlook.weather[0].description,
  weather: outlook.weather[0].main,
  cloud: outlook.clouds.all,
  date: outlook.dt,
  temp: {
    celsius: convert(outlook.main.temp),
    farenheit: outlook.main.temp,
  },
})

export const processResponse = data => ({
  forecasts: data.list.map(processForecasts),
  city: data.city.name,
  now: Date.now(),
})

export const checkResponseHeaders = response => {
  if (response.status >= 400) { 
    const error = new Error(`Invalid server response: ${status}`)
    error.response = response
    throw error
  }

  return response.json()
}

export const processTime = ({ city, now, forecasts }) => ({
  now,
  city,
  forecasts: forecasts.map(parseTime),
})

export const stripDateIfRedundant = (thisDay, index, array) => {
  const { day, ...rest } = thisDay
  if (index > 0 && array[index - 1].day === day) {
    return { day: '', ...rest }
  } else {
    return { day, ...rest }
  }
} 

export const stripDates = ({city, now, forecasts}) => ({ 
  now,
  city,
  forecasts: forecasts.map(stripDateIfRedundant)
}) 
