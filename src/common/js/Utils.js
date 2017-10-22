/* @flow */
import { MONTH, WEEK } from './Constants';
import ExtendableError from 'extendable-error-class';

const SEC_IN_MINUTES = 60;
const kSEC_IN_SECONDS = 1000;
const DEFAULT_TIMEOUT = 5000;

const scaleIntToMinutes = (val: number) =>
  val * kSEC_IN_SECONDS * SEC_IN_MINUTES;

const shrinkMinutesToInt = (val: number) =>
  val / kSEC_IN_SECONDS / SEC_IN_MINUTES;

const checkForNegativeZero = (n: number) =>
  (n === 0 ? ((n = +n) || 1 / n) < 0 ? 0 : n : n);

const convertFahrenheitToCelsius = (temp: number) =>
  checkForNegativeZero(Math.round((temp - 32) * 5 / 9));

const trim = (str: string) => str.replace(/^\s+|\s+$/g, '');
const rand = (range: number) => Math.floor(Math.random() * (range + 1));
const eventType = () => ('ontouchstart' in window ? 'touchstart' : 'click');

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

const serialize = (url: string, params: ?Object) => {
  const urlParams = Object.keys(params || {});
  const key = (prop: string) => encodeURIComponent(prop);
  const value = (prop: string) => encodeURIComponent(params[prop]);

  return urlParams.length <= 0
    ? url
    : `${url}?${urlParams.map(p => `${key(p)}=${value(p)}`).join('&')}`;
};

class ResponseError extends ExtendableError {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

const appendSuffix = (day: number) =>
  (day === 1
    ? `${day}st`
    : day === 2 ? `${day}nd` : day === 3 ? `${day}rd` : `${day}th`);

const dateString = (time: Date) =>
  `${WEEK[time.getDay()]}, ` +
  `${MONTH[time.getMonth()]} ` +
  `${appendSuffix(time.getDate())}`;

const checkHeaders = (response: Response) => {
  if (response.status !== 200)
    throw new ResponseError('fetch failed', response);
  return response.json();
};

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
