/* @flow */
import { week, month } from './constants';
import ExtendableError from 'extendable-error-class';

const removeChildren = (el: HTMLElement) => {
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }
};

//insert npm joke here
const padLeft = (number: string, columns: number) => {
  while (number.length < columns) {
    number = `0${number}`;
  }
  return number;
};

const parseTimeToText = (elapsedTime: number) => {
  const time = new Date(elapsedTime);
  const minutes = padLeft(time.getMinutes().toString(), 2);
  const seconds = padLeft(time.getSeconds().toString(), 2);
  const milliseconds = padLeft(time.getMilliseconds().toString(), 3);
  return `${minutes}:${seconds}.${milliseconds}`;
};

const SEC_IN_MINUTES = 60;
const kSEC_IN_SECONDS = 1000;

const scale = (val: number) => val * kSEC_IN_SECONDS * SEC_IN_MINUTES;

const shrink = (val: number) => val / kSEC_IN_SECONDS / SEC_IN_MINUTES;

const serialize = (url: string, params: ?Object) => {
  const query = [];

  if (params !== undefined) {
    url += '?';

    for (var property in params) {
      if (params.hasOwnProperty(property)) {
        query.push(
          encodeURIComponent(property) +
            '=' +
            encodeURIComponent(params[property]),
        );
      }
    }
  }

  return url + query.join('&');
};

class ResponseError extends ExtendableError {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

const appendSuffix = (day: number) => {
  return day === 1
    ? `${day}st`
    : day === 2 ? `${day}nd` : day === 3 ? `${day}rd` : `${day}th`;
};

const dateString = (time: Date) => {
  return (
    `${week[time.getDay()]}, ` +
    `${month[time.getMonth()]} ` +
    `${appendSuffix(time.getDate())}`
  );
};

const checkForNegativeZero = (n: number) =>
  (n === 0 ? ((n = +n) || 1 / n) < 0 ? 0 : n : n);

const convertFahrenheitToCelsius = (temp: number) =>
  checkForNegativeZero(Math.round((temp - 32) * 5 / 9));

const checkHeaders = (response: Response) => {
  if (response.status !== 200)
    throw new ResponseError('fetch failed', response);
  return ((response.json(): any): Promise<any>);
};

const eventType = () => ('ontouchstart' in window ? 'touchstart' : 'click');

const trim = (str: string) => str.replace(/^\s+|\s+$/g, '');

export {
  checkForNegativeZero,
  eventType,
  checkHeaders,
  padLeft,
  parseTimeToText,
  scale,
  shrink,
  serialize,
  ResponseError,
  appendSuffix,
  dateString,
  convertFahrenheitToCelsius,
  trim,
  removeChildren,
};
