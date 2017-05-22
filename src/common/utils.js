/* @flow */
import { week, month } from './constants';
import ExtendableError from 'extendable-error-class';

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

const serialize = (url: string, params: Object) => {
  const query = [];

  if (params !== undefined) url += '?';

  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      query.push(
        encodeURIComponent(property) +
          '=' +
          encodeURIComponent(params[property]),
      );
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

const convertFahrenheitToCelsius = (temp: number) =>
  Math.round((temp - 32) * 5 / 9);

const dispatch = (
  selector: string | HTMLElement,
  type: string | Event,
  data = {},
) => {
  const element = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  var event = typeof type === 'string'
    ? new CustomEvent(type, { target: element })
    : type;
  element.dispatchEvent(event);
};

const json = (m: Object): string => JSON.stringify(m);

const checkHeaders = (response: Response) => {
  if (response.status >= 400) throw new ResponseError('fetch failed', response);
  return ((response.json(): any): Promise<any>);
};

export {
  checkHeaders,
  json,
  padLeft,
  parseTimeToText,
  scale,
  serialize,
  ResponseError,
  appendSuffix,
  dateString,
  convertFahrenheitToCelsius,
  dispatch,
};
