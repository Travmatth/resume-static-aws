/* @flow */

import { fetchWeather } from '../Api';

import type {
  ApiParams,
  Forecast,
  DailyTemperature,
  DailyForecast,
  Daily,
  Weather,
  FiveDayForecast,
} from '../localweather.types';

import {
  serialize,
  dateString,
  appendSuffix,
  ResponseError,
  convertFahrenheitToCelsius,
} from 'common/js/utils';
import OPEN_WEATHER_APPID from 'protected/localweather.key';
import { endpoint, openweatherApiParams } from '../Models';

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
  let weather: ?Weather;
  weather = await fetchWeather(resource);

  if (weather) {
    const { forecasts, city } = weather;
    const temperatures = forecasts.map(elem => elem.temp);
    if (header) header.textContent = city;
    if (cells) updateTableRows(cells, forecasts, 'fahrenheit');
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
//TODO: store temperatures in dataset attr
const updateTableRows = (
  nodes: NodeList<HTMLElement>,
  results: Array<Daily>,
  temperature: string,
): void => {
  let index = 0;
  let node = nodes.item(index);
  let forecast = results[index];
  console.log(nodes, results);
  document.debug_nodes = nodes;

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

    if (!node.children[2].dataset) node.children[2].dataset = {};
    node.children[2].dataset.celsius = temp.celsius;
    node.children[2].dataset.fahrenheit = temp.fahrenheit;

    node.children[2].textContent = temperature === 'celsius'
      ? `${temp.celsius}`
      : `${temp.fahrenheit}`;

    ((node.children[3].children[0]: any): HTMLImageElement).src = icon;

    node.children[4].textContent = description;

    if (node.className === 'hide') node.className.replace(/hide/, 'show');

    // Finally, point to next element in source arrays
    index += 1;
    node = nodes.item(index);
    forecast = results[index];
  }
};

//TODO: figure out failing test, rewrite -> store temp in dataset
const toggleTempChangeHandler = (nodes: NodeList<HTMLElement>) => (
  //temperatures: ?Array<DailyTemperature>,
  event: Event,
) => {
  let index = 0;
  let node = nodes.item(index);
  let desired = event.target.dataset.type === 'fahrenheit';

  while (node) {
    node.textContent = node.dataset[desired ? 'fahrenheit' : 'celsius'];

    index += 1;
    node = nodes.item(index);
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
