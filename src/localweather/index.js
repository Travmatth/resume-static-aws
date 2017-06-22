/* @flow */
import { toggleTempChangeHandler, getWeatherHandler } from './Handlers';
import { eventType } from 'common/js/utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.measurement');
    const header = document.querySelector('.heading');
    const cells = document.querySelectorAll('.cell');
    const tempToggles = ((document.querySelectorAll('input'): any): NodeList<
      HTMLInputElement
    >);

    const toggle = toggleTempChangeHandler(toggles);
    tempToggles.forEach(elem => elem.addEventListener(eventType(), toggle));

    const getWeather = getWeatherHandler(header, cells, tempToggles);
    navigator.geolocation.getCurrentPosition(getWeather);
  });
}
