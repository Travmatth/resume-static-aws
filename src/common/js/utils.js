/* @flow */
import { MONTH, WEEK } from './constants';
import ExtendableError from 'extendable-error-class';

const removeChildren = (el: HTMLElement) => {
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }
};

//insert npm joke here
const padLeft = (val: string, columns: number) => {
  while (val.length < columns) {
    val = `0${val}`;
  }
  return val;
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

const scaleIntToMinutes = (val: number) =>
  val * kSEC_IN_SECONDS * SEC_IN_MINUTES;

const shrinkMinutesToInt = (val: number) =>
  val / kSEC_IN_SECONDS / SEC_IN_MINUTES;

const serialize = (url: string, params: ?Object) => {
  const query = [];

  if (params !== undefined) {
    url += '?';

    const encode = encodeURIComponent;
    for (let property in params) {
      if (params.hasOwnProperty(property)) {
        query.push(`${encode(property)}=${encode(params[property])}`);
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
    `${WEEK[time.getDay()]}, ` +
    `${MONTH[time.getMonth()]} ` +
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
  return response.json();
};

const eventType = () => ('ontouchstart' in window ? 'touchstart' : 'click');

const trim = (str: string) => str.replace(/^\s+|\s+$/g, '');

const rand = (range: number) => Math.floor(Math.random() * (range + 1));

const DEFAULT_TIMEOUT = 5000;

const withTimeout = (promise: Promise<any>, ms: number = DEFAULT_TIMEOUT) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error('timeout'));
    }, ms);

    promise.then(
      response => {
        clearTimeout(id);
        resolve(response);
      },
      error => {
        clearTimeout(id);
        reject(error);
      },
    );
  });

export {
  checkForNegativeZero,
  eventType,
  checkHeaders,
  padLeft,
  parseTimeToText,
  scaleIntToMinutes,
  shrinkMinutesToInt,
  serialize,
  ResponseError,
  appendSuffix,
  dateString,
  convertFahrenheitToCelsius,
  trim,
  removeChildren,
  rand,
  withTimeout,
  DEFAULT_TIMEOUT,
};
