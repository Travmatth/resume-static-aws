/* @flow */

import { fetchWeather } from '../Api';
import { removeChildren, timedFetch } from 'common/js/utils';
import type { Daily, Weather } from '../localweather.types';

/* fetchHandler dispatches a callback to browser geolocation
 */
const fetchHandler = (show: () => void, ...elements) => (_: Event) => {
  // toggle loading animation
  show('loading');

  navigator.geolocation.getCurrentPosition(weatherHandler(show, ...elements));
};

/* weatherHandler uses browser geolocation coordinates
 * to fetch weather and update the page's table
 */
const weatherHandler = (
  show: () => void,
  span: HTMLElement,
  tbody: HTMLTableSectionElement,
) => async (location: Position) => {
  const { coords } = location;
  const weather = await fetchWeather(coords);

  if (weather.error) {
    console.error(weather.thrown);
    show('error');
  } else {
    const { forecasts, city } = weather;
    span.textContent = city;
    updateTableRows('fahrenheit', tbody, forecasts, show);
  }
};

/* updateTableRows uses fetched weather data to create tiles, append to tbody
 */
const updateTableRows = (
  desired: 'fahrenheit' | 'celsius',
  tbody: HTMLTableSectionElement,
  forecasts: Array<Daily>,
  show: () => void,
) => {
  removeChildren(tbody);
  const fragment = document.createDocumentFragment();

  /* tr.cell.hide
      td.day
      td.time
      td.measurement
      td.icon
        img
      td.weather
  */
  forecasts.forEach((forecast: Daily) => {
    const tr = document.createElement('tr');
    tr.innerHTML = require('../Assets/tile.html');
    const { icon, temp, day, time, weather, description } = forecast;

    const img = tr.querySelector('img');
    const dayNode = tr.querySelector('.day');
    const measureNode = tr.querySelector('.measurement');
    const timeNode = tr.querySelector('.time');
    const weatherNode = tr.querySelector('.weather');

    img.src = icon;
    dayNode.textContent = day;
    timeNode.textContent = time;
    weatherNode.textContent = description;

    if (!measureNode.dataset) measureNode.dataset = {};
    measureNode.dataset.celsius = temp.celsius;
    measureNode.dataset.fahrenheit = temp.fahrenheit;

    measureNode.textContent = desired === 'celsius'
      ? `${temp.celsius}`
      : `${temp.fahrenheit}`;
    measureNode.addEventListener(TOGGLE_EVENT, toggleMeasurement);

    fragment.appendChild(tr);
  });

  // Make table visible
  tbody.appendChild(fragment);
  show('table');
};

const TOGGLE_EVENT = 'TOGGLE_EVENT';

/* dispatchToggleEvent causes measurement cells to switch their displayed temp
 */
const dispatchToggleEvent = (measurement: 'fahrenheit' | 'celsius') => (
  _: Event,
) =>
  document.querySelectorAll('.measurement').forEach(el => {
    el.dispatchEvent(
      new CustomEvent(TOGGLE_EVENT, {
        detail: { measurement },
      }),
    );
  });

/* toggleMeasurement switches targeted elements displayed temperature
 */
const toggleMeasurement = (event: Event) => {
  const { target, detail: { measurement } } = event;
  target.textContent = target.dataset[measurement];
};

/* tempScale determines desired temperature scale
 */
const tempScale = () =>
  (((document.querySelector('.celsius'): any): HTMLInputElement).checked ===
    true
    ? 'celsius'
    : 'fahrenheit');

/* showScene manages display of different fetching states
 */
const showScene = (
  error: HTMLElement,
  spinner: HTMLElement,
  table: HTMLTableElement,
) => (scene: 'loading' | 'error' | 'table') => {
  let spinnerHidden, errorHidden, tableHidden;

  switch (scene) {
    case 'loading':
      spinnerHidden = false;
      errorHidden = true;
      tableHidden = true;
      break;

    case 'error':
      spinnerHidden = true;
      errorHidden = false;
      tableHidden = true;
      break;

    case 'table':
      spinnerHidden = true;
      errorHidden = true;
      tableHidden = false;
      break;

    default:
      spinnerHidden = true;
      errorHidden = true;
      tableHidden = true;
      break;
  }

  spinner.classList.toggle('hidden', spinnerHidden);
  table.classList.toggle('hidden', tableHidden);
  error.classList.toggle('hidden', errorHidden);
};

export {
  showScene,
  fetchHandler,
  weatherHandler,
  updateTableRows,
  TOGGLE_EVENT,
  dispatchToggleEvent,
  toggleMeasurement,
  tempScale,
};
