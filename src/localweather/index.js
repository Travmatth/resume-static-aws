/* @flow */

/*
  Libraries
*/

import { 
  week, 
  month, 
  dateString, 
  appendSuffix, 
  convertFahrenheitToCelsius, 
} from './constants';
import { OPEN_WEATHER_APPID, } from '../common/api_keys';
import { serialize, ResponseError } from '../common/utils';

// Mocking fetch during dev
import * as MOCK from './mockdata'

/*
  Constants
*/

// Initiliazed in DOMContentLoaded
let cells: ?NodeList<HTMLElement>;

// determine user preference in which temp scale temperature is displayed in
const tempBtn = document.querySelector('.celsius') 
const getTempScale = () => (
  tempBtn instanceof window.HTMLInputElement 
    ? tempBtn.checked === true ? 'celsius' : 'fahrenheit'
    : 'fahrenheit'
)

// api call params
export const endpoint = 'http://api.openweathermap.org/data/2.5/forecast';

export const openweatherApiParams = (lat: number, lon: number) => ({
  'lat': lat,
  'lon': lon,
  'units': 'imperial',
  'APPID': OPEN_WEATHER_APPID,
});

/*
  Start program
*/

export const getWeather = async (location: Position) => {
  const { latitude, longitude, } = location.coords; 
  const options = openweatherApiParams(latitude, longitude);
  const resource: string = serialize(endpoint, options);

  const cells = document.querySelectorAll('.cell');
  const header = document.querySelector('.heading');

  // Call API, update dom
  try {
    const weather: Weather = await fetchWeather(resource)
    const { forecasts, city, } = weather
    header.textContent =  city
    updateTableRows(cells, forecasts, getTempScale())
  } catch(error) {
    console.error('error', error)
  }
};

export const contentLoadedListener = async (time: number = 500) =>  {
  // const launch = () => navigator.geolocation.getCurrentPosition(getWeather);
  navigator.geolocation.getCurrentPosition(getWeather);
  // setTimeout(launch, time);
}

if (document !== undefined) {
  // $FlowIgnore: addEventListener throws err, signature doesn't allow async 
  document.addEventListener('DOMContentLoaded', contentLoadedListener);
}  

/*
  Network call
*/

export const fetchWeather = async (url: string): Promise<Weather> => {
  /* Fetch initial resource after delay, direct fetching leads to:

     Fetch API cannot load 
       http://api.openweathermap.org/data/2.5/forecast?
       lat=40.247796099999995&
       lon=-75.64445769999999&
       units=imperial&
       APPID=c26ef1df98c449f37f8f199738ce74c7. 

     Request header field content-type is not allowed 
     by Access-Control-Allow-Headers in preflight response.

     "The server (that the POST request is sent to) needs to include the 
       Access-Control-Allow-Headers header (etc) in its response." 

     i.e., since the server doesn't allow CORS, we're out of luck
     http://stackoverflow.com/
     questions/25727306/
     request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr

     Should I use JSONP + validation, will this work?
     Or set up proxy on heroku?
  */

  const opts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  
  // Stubbing out fetch while designing layout
  const data = [JSON.stringify(MOCK.response)]
  const blob = new Blob(data, { type: 'application/json' });
  const stub = new Response(blob)

  return await Promise.resolve(stub)
  // return await fetch(url, opts)
    .then(checkResponse)
    .then(processWeather)
    .catch(error => { throw error })
};

/*
  DOM Interaction
*/

/**
 * updateTableRows fills in given table rows (each containing a dates weather info)
 * with the supplied information
 * @param  { NodeList<HTMLTableRowElement> } nodes the table row elements to be populated
 * @param  { Array<Forecasts> } results the parsed weather forecasts
 * @return { void } void
 */
export const updateTableRows = (
  nodes: NodeList<HTMLElement>, 
  results: Array<Daily>, 
  temperature: string
): void => {
  let index = 0
  let node = nodes.item(index)
  let forecast = results[index]

  while (node && forecast) {
    /* Populate children cells according to template: 
      tr.cell.hide
        td.day
        td.time
        td.measurement
        td.icon 
          img
        td.weather
    */
    const { icon, temp, day, time, weather, description, } = forecast

    node.children[0].textContent = day
    node.children[1].textContent = time
    node.children[2].textContent = temperature === 'celsius'
      ? `${temp.celsius}`
      : `${temp.fahrenheit}`
    const imgElem: any = node.children[3].children[0]
    imgElem.src = icon
    node.children[4].textContent = description

    if (node.className === 'hide') node.className.replace(/hide/, 'show')

    // Finally, point to next element in source arrays 
    index += 1
    node = nodes.item(index)
    forecast = results[index]
  }
};

/* 
  Supporting Functions
*/ 

export const checkResponse = async (response: Response): Promise<FiveDayForecast> => {
  if (response.status < 200 || response.status >= 400) { 
    throw new ResponseError('localweather fetch failed', response)
  }

  return await (response.json(): Promise<FiveDayForecast>)
};

export const processWeather = (data: FiveDayForecast): Weather => ({
  city: data.city.name,
  now: Date.now(),
  forecasts: data.list
    .map(processForecasts)
    .map(stripDateIfRedundant)
});

export const processForecasts = (outlook: Forecast): DailyForecast => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: outlook.rain && outlook.rain['3h'] || 0,
  snow: outlook.snow && outlook.snow['3h'] || 0,
  description: outlook.weather[0].description,
  weather: outlook.weather[0].main,
  cloud: outlook.clouds.all,
  temp: {
    celsius: convertFahrenheitToCelsius(outlook.main.temp),
    fahrenheit: outlook.main.temp,
  },
  ...parseTime(outlook.dt)
});

export const parseTime = (time: number): Daily => {
  const duration = new Date(time * 1000)
  const hours = duration.getHours() % 12
  const minutes = duration.getMinutes()

  return { day: dateString(duration), time: `${hours}:${minutes}0`, }
}

export const stripDateIfRedundant = (
  today: Daily, 
  index: number, 
  seq: Array<Daily>
): Daily => {
  const { day, ...rest } = today
  const dateRedundant = index > 0 && seq[index - 1].day === day 

  if (dateRedundant) return { day: '', ...rest }
  return { day, ...rest }
} 
