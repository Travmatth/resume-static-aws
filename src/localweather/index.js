import { toggleTempChangeHandler, getWeatherHandler } from './Handlers';

let contentLoadedListener: () => void;
let toggles: NodeList<HTMLInputElement>;
let header: NodeList<HTMLInputElement>;
let cells: NodeList<HTMLInputElement>;
let tempToggles: NodeList<HTMLInputElement>;

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    toggles = document.querySelectorAll('.measurement');
    header = document.querySelector('.heading');
    cells = document.querySelectorAll('.cell');
    tempToggles = ((document.querySelectorAll('input'): any): NodeList<
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

export default contentLoadedListener;
