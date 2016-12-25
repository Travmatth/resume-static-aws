/* @flow */

//Types
import { 
  DailyForecast, Weather, FiveDayForecast, Forecast, Daily
} from './index.js.flow' 

import { serialize, ResponseError } from '../common/utils'
import { parseTime } from './constants'

//Initiliazed in DOMContentLoaded
let cells: ?NodeList<HTMLElement>

// openweatherapi params
export const params = (lat: number, lon: number): Object => ({
  'lat': lat,
  'lon': lon,
  'units': 'imperial',
  'APPID': 'c26ef1df98c449f37f8f199738ce74c7',
})

export const endpoint = 'http://api.openweathermap.org/data/2.5/forecast' 

/* MAIN */
export const main = (time: number = 500): void =>  {
  cells = document.querySelectorAll('.cell')

  setTimeout(() => {
    navigator.geolocation.getCurrentPosition( location => {
      const { latitude, longitude, } = location.coords 
      
      // openweatherapi url (params encoded in url)
      const resource: string = serialize(endpoint, params(latitude, longitude))

      // Call API, parse response
      try {
        const weather: any = fetchWeather(resource)

      // Call API, parse response, generate data, update DOM
      // updateDOM(weather, cells)
      } catch(error) {
        console.error('error', error)
      }
    })
  }, time);
}

// document.addEventListener('DOMContentLoaded', main);

export const fetchWeather = async (url: string): Weather => {
  // Fetch initial resource after delay
  // mixed content restrictions (can't request http on https page)
  // Should I use JSONP + validation,
  // Or set up proxy on heroku?
  const opts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }

  
  return await fetch(url, opts)
    .then(checkResponse)
    .then(processWeather)
    .catch(err => { throw err })
}

export const checkResponse = async (response: Response): FiveDayForecast => {
  if (response.status < 200 || response.status >= 400) { 
    throw new ResponseError('localweather fetch failed', response)
  }

  return await (response.json(): FiveDayForecast)
}

export const processWeather = (data: FiveDayForecast): Weather => ({
  city: data.city.name,
  now: Date.now(),
  forecasts: data.list
    .map(processForecasts)
    .map(parseTime)
    .map(stripDateIfRedundant)
})

export const convertFahrenheitToCelsius = (temp: number) => (
  Math.round(temp * 1.8 + 32)
)

export const processForecasts = (outlook: Forecast): DailyForecast => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: outlook.rain && outlook.rain['3h'] || 0,
  snow: outlook.snow && outlook.snow['3h'] || 0,
  description: outlook.weather[0].description,
  weather: outlook.weather[0].main,
  cloud: outlook.clouds.all,
  date: outlook.dt,
  temp: {
    celsius: convertFahrenheitToCelsius(outlook.main.temp),
    farenheit: outlook.main.temp,
  },
});

export const stripDateIfRedundant = (
  today: Daily, 
  index: number, 
  seq: Array<Daily>
): Daily => {
  const { day, ...rest } = today
  if (index > 0 && seq[index - 1].day === day) {
    return { day: '', ...rest }
  } else {
    return { day, ...rest }
  }
} 

export const updateDOM = (results: Array<Object>): void => {
  results.map(result => {
    if (cells) cells.forEach(cell => {
      //create cells using info from result

      //make visible
      toggleVisibility(cell)
    })
  })
}

export const toggleVisibility = (el: HTMLElement): void => {
  el.className.match(/hide/)
    ? el.className.replace(/hide/, 'show')
    : el.className.replace(/show/, 'hide')
}
