/* @flow */
import { serialize, ResponseError } from '../common/utils'
import { parseTime } from './constants'

//Initiliazed in DOMContentLoaded
let cells: ?NodeList<HTMLElement>

// openweatherapi params
export const endpoint = 'http://api.openweathermap.org/data/2.5/forecast' 
export const params = (lat: number, lon: number): Object => ({
  'lat': lat,
  'lon': lon,
  'units': 'imperial',
  'APPID': 'c26ef1df98c449f37f8f199738ce74c7',
})


//MAIN
export const main = () =>  {
  // cells = document.querySelectorAll('.cell')

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
        console.error('error')
        console.error(error)
      }
    })
  }, 500);
}

// document.addEventListener('DOMContentLoaded', main);

export const fetchWeather = async (url: string): any => {
// export const fetchWeather = async (): any => {
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
    // body: JSON.stringify({ url })
  }

  
  return await fetch(url, opts)
    .then(checkResponse)
    // .then(processJSON)
    .catch(err => { throw err })
}

//   .then(processWeather)
//   .then(processTime)
//   .then(stripDates)
//   .then(updateDOM)
//   .catch(processError) 

// If error in process, update DOM appropriately
export const checkResponse = async (response: Response): any => {
  if (response.status < 200 || response.status >= 400) { 
    const err = new ResponseError('localweather fetch failed', response)
    throw err  
  }

  return await (response.json(): any)
}

// export const processJSON = (json: any): FiveDayForecast => {
//   return (json: FiveDayForecast)
// }

// export const processWeather = (data: fiveDayForecast): WeatherResponse  => ({
//   forecasts: data.list.map(processForecasts),
//   city: data.city.name,
//   now: Date.now(),
// })

// export const convertFahrenheitToCelsius = temp => Math.round(temp * 1.8 + 32)

// export const processResponse = (data: fiveDayForecast): WeatherResponse  => ({
// // export const processTime = ({ city, now, forecasts }) => ({
// // export const processTime = (weather: WeatherResponse) => ({
// //   now,
// //   city,
// //   forecasts: forecasts.map(parseTime),
// // })

// export const processForecasts = (outlook: Forecast): DailyForecast => ({
//   icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
//   rain: outlook.rain && outlook.rain['3h'] || null,
//   snow: outlook.snow && outlook.snow['3h'] || null,
//   description: outlook.weather[0].description,
//   weather: outlook.weather[0].main,
//   cloud: outlook.clouds.all,
//   date: outlook.dt,
//   temp: {
//     celsius: convertFahrenheitToCelsius(outlook.main.temp),
//     farenheit: outlook.main.temp,
//   },
// })

// export const stripDateIfRedundant = (thisDay, index, array) => {
//   const { day, ...rest } = thisDay
//   if (index > 0 && array[index - 1].day === day) {
//     return { day: '', ...rest }
//   } else {
//     return { day, ...rest }
//   }
// } 

// export const stripDates = ({city, now, forecasts}) => ({ 
//   now,
//   city,
//   forecasts: forecasts.map(stripDateIfRedundant)
// }) 

// export const updateDOM = (results: Array<Object>): void => {
//   results.map(result => {
//     if (cells) cells.map(cell => {
//       //create cells using info from result

//       //make visible
//       toggleVisibility(cell)
//     })
//   })
// }

// export const toggleVisibility = (el: HTMLElement): void => {
//   el.className.match(/hide/)
//     ? el.className.replace(/hide/, 'show')
//     : el.className.replace(/show/, 'hide')
// }
