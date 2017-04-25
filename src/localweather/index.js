import { toggleTempChangeHandler, getWeatherHandler } from './Handlers';

let contentLoadedListener, toggles, header, cells, tempToggles;

if (document !== undefined) {
  contentLoadedListener = async () => {
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
  };

  document.addEventListener('DOMContentLoaded', contentLoadedListener);
}

export default contentLoadedListener;
