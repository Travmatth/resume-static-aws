/* @flow */

/*
  Types
*/

import { 
  DailyForecast, 
  Weather, 
  FiveDayForecast, 
  Forecast, 
  Daily, 
  Coordinates, 
  ApiParams,
} from './index.js.flow';

/*
  Libraries
*/

import { serialize, ResponseError } from '../common/utils';
import { parseTime } from './constants';

/*
  Constants
*/

//Initiliazed in DOMContentLoaded
let cells: ?NodeList<HTMLElement>;

export const endpoint = 'http://api.openweathermap.org/data/2.5/forecast';

export const openweatherApiParams = (lat: number, lon: number): ApiParams => ({
  'lat': lat,
  'lon': lon,
  'units': 'imperial',
  'APPID': 'c26ef1df98c449f37f8f199738ce74c7',
});

/*
  Start program
*/

export const contentLoadedListener = async (
  cells: NodeList<HTMLElement>, 
  time: number = 500
): void =>  {
  cells.forEach(el => console.log(el));
  const launch = () => navigator.geolocation.getCurrentPosition(getWeather);
  setTimeout(launch, time);
}

if (document !== undefined) {
  const cells = document.querySelectorAll('.cell');
  const listener = contentLoadedListener.bind(undefined, cells);
  document.addEventListener('DOMContentLoaded', listener);
}

export const getWeather = async (location: Coordinates): void  => {
  const { latitude, longitude, } = location.coords; 
  
  const opts = openweatherApiParams(latitude, longitude);
  const resource: string = serialize(endpoint, opts);

  // Call API, parse response
  try {
    const weather: any = await fetchWeather(resource)
    updateDOM(weather, cells)
  } catch(error) {
    console.error('error', error)
  }
};

/*
  Network call
*/

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
    }
  }
  
  return await fetch(url, opts)
    .then(checkResponse)
    .then(processWeather)
    .catch(error => { throw error })
};

/*
  DOM Interaction
*/


export const updateDOM = (results: Object[], nodes: Object[]): void => {
  results.map(result => {
    if (nodes) nodes.forEach(cell => {
      //Iter over the table data's containing the content
      cell.children.forEach(element => {

        //create cells using info from result
        // { weatherJson.forecasts.map((val, i) => {
        //   const { icon, temp, day, time, weather, description, } = val

        switch (element.className) {
          case 'day': 
            element.textContent = result.day
            break

          case 'time': 
            element.textContent = result.time
            break

          case 'measurement': 
            //   const measurement = active('CELSIUS') 
            //     ? `${temp.celsius}°C`
            //     : `${temp.farenheit}°F`
            //     img key={icon} src={`${icon}`}
            
            // element.textContent = result.measurement
            element.textContent = ''
            break

          case 'icon': 
            //Icon td contains both an img element & td.weather
            break

          default: 
            console.error('Unrecognized HTMLElement', element)
            break
        }
      })

      //Make visible

      // extract classname, make visible if applicable
      // const { className } = cell
      // toggleVisibility(className)
    });
  });
};

/* 
  Supporting Functions
*/

export const checkResponse = async (response: Response): FiveDayForecast => {
  if (response.status < 200 || response.status >= 400) { 
    throw new ResponseError('localweather fetch failed', response)
  }

  return await (response.json(): FiveDayForecast)
};

export const processWeather = (data: FiveDayForecast): Weather => ({
  city: data.city.name,
  now: Date.now(),
  forecasts: data.list
    .map(processForecasts)
    .map(parseTime)
    .map(stripDateIfRedundant)
});

export const convertFahrenheitToCelsius = (temp: number) => (
  Math.round(temp * 1.8 + 32)
);

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
  const dateRedundant = index > 0 && seq[index - 1].day === day 

  if (dateRedundant) {
    return { day: '', ...rest }
  } else {
    return { day, ...rest }
  }
} 

export const toggleVisibility = (css: string, toggled: boolean): void => {
  toggled
    ? css.replace(/hide/, 'show')
    : css.replace(/show/, 'hide')
}
