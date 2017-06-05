/* @flow */

import { fetchWeather } from './Api';

import type {
  ApiParams,
  Forecast,
  DailyTemperature,
  DailyForecast,
  Daily,
  Weather,
  FiveDayForecast,
} from '../localweather.types';

/*
  Libraries
*/

import {
  serialize,
  dateString,
  appendSuffix,
  ResponseError,
  convertFahrenheitToCelsius,
} from 'common/utils';
import { OPEN_WEATHER_APPID } from 'common/api_keys';
import { endpoint, openweatherApiParams } from './constants';

// Mocking fetch during dev
//import * as MOCK from './mockdata';
const getWeatherHandler = (
  header: ?HTMLElement,
  cells: ?NodeList<HTMLElement>,
  tempToggles: ?NodeList<HTMLInputElement>,
) => async (location: Position) => {
  const { latitude, longitude } = location.coords;
  const params = openweatherApiParams(latitude, longitude);
  const resource: string = serialize(endpoint, params);

  // Call API, update dom
  try {
    const weather: Weather = await fetchWeather(resource);
    const { forecasts, city } = weather;
    const temperatures = forecasts.map(elem => elem.temp);
    if (header) header.textContent = city;
    if (cells) updateTableRows(cells, forecasts, 'fahrenheit');
  } catch (error) {
    console.error('error', error);
  }
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
const updateTableRows = (
  nodes: NodeList<HTMLElement>,
  results: Array<Daily>,
  temperature: string,
): void => {
  let index = 0;
  let node = nodes.item(index);
  let forecast = results[index];

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
    const { icon, temp, day, time, weather, description } = forecast;

    node.children[0].textContent = day;
    node.children[1].textContent = time;
    node.children[2].textContent = temperature === 'celsius'
      ? `${temp.celsius}`
      : `${temp.fahrenheit}`;
    const imgElem: any = node.children[3].children[0];
    imgElem.src = icon;
    node.children[4].textContent = description;

    if (node.className === 'hide') node.className.replace(/hide/, 'show');

    // Finally, point to next element in source arrays
    index += 1;
    node = nodes.item(index);
    forecast = results[index];
  }
};

const toggleTempChangeHandler = (nodes: NodeList<HTMLElement>) => (
  temperatures: ?Array<DailyTemperature>,
) => {
  let index = 0;

  let node = nodes.item(index);
  let temp;
  if (temperatures) temp = temperatures[index];

  while (node && temp) {
    node.textContent = tempScale() === 'celsius'
      ? `${temp.fahrenheit}`
      : `${temp.celsius}`;

    // Finally, point to next element in source arrays
    index += 1;
    node = nodes.item(index);
    if (temperatures) temp = temperatures[index];
    else {
      break;
    }
  }
};

// determine user preference in which temp scale temperature is with
const tempScale = () => {
  return ((document.querySelector('.celsius'): any): HTMLInputElement)
    .checked === true
    ? 'celsius'
    : 'fahrenheit';
};

export {
  tempScale,
  getWeatherHandler,
  updateTableRows,
  toggleTempChangeHandler,
};
