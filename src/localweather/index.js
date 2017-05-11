/* @flow */
import { toggleTempChangeHandler, getWeatherHandler } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.measurement');
    const header = document.querySelector('.heading');
    const cells = document.querySelectorAll('.cell');
    const tempToggles = ((document.querySelectorAll('input'): any): NodeList<
      HTMLInputElement
    >);

    if (tempToggles)
      tempToggles.forEach(elem => {
        elem.addEventListener('click', toggleTempChangeHandler(toggles));
      });

    const getWeather = getWeatherHandler(header, cells, tempToggles);
    navigator.geolocation.getCurrentPosition(getWeather);
  });
}
