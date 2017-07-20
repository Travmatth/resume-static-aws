/* @flow */

import { fetchWeather } from '../Api';
import type { Daily, Weather } from '../localweather.types';

/* fetchHandler dispatches a callback to browser geolocation
 */
//span: HTMLElement,
//tbody: HTMLTableSectionElement,
//table: HTMLTableElement
const fetchHandler = (...elements) => (_: Event) =>
  navigator.geolocation.getCurrentPosition(weatherHandler(...elements));
//.getCurrentPosition(weatherHandler(span, tbody, table));

/* weatherHandler uses browser geolocation coordinates
 * to fetch weather and update the page's table
 */
const weatherHandler = (
  span: HTMLElement,
  tbody: HTMLTableSectionElement,
  table: HTMLTableElement,
) => async (location: Position) => {
  const { coords } = location;
  document.querySelector('.spinner').classList.toggle('hidden', false);
  const weather = await fetchWeather(coords);

  if (weather.error) {
    console.error(weather.thrown);
  } else {
    const { forecasts, city } = weather;
    span.textContent = city;
    document.querySelector('.spinner').classList.toggle('hidden', true);
    updateTableRows(tbody, forecasts, 'fahrenheit', table);
  }
};

/* updateTableRows uses fetched weather data to create tiles, append to tbody
 */
const updateTableRows = (
  tbody: HTMLTableSectionElement,
  results: Array<Daily>,
  desired: 'fahrenheit' | 'celsius',
  table: HTMLTableElement,
) => {
  /* tr.cell.hide
      td.day
      td.time
      td.measurement
      td.icon
        img
      td.weather
  */
  results.forEach((forecast: Daily) => {
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

    tbody.appendChild(tr);
  });

  // Make table visible
  table.classList.toggle('hidden', false);
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

export {
  fetchHandler,
  weatherHandler,
  updateTableRows,
  TOGGLE_EVENT,
  dispatchToggleEvent,
  toggleMeasurement,
  tempScale,
};
