/* @flow */
import { week, month } from './constants';
import ExtendableError from 'extendable-error-class';

//insert npm joke here
export const padLeft = (number, columns) => {
  while (number.length < columns) {
    number = `0${number}`;
  }
  return number;
};

export const parseTimeToText = elapsedTime => {
  const time = new Date(elapsedTime);
  const minutes = padLeft(time.getMinutes().toString(), 2);
  const seconds = padLeft(time.getSeconds().toString(), 2);
  const milliseconds = padLeft(time.getMilliseconds().toString(), 3);
  return `${minutes}:${seconds}.${milliseconds}`;
};

const SEC_IN_MINUTES = 60;
const kSEC_IN_SECONDS = 1000;

export const scale = val => val * kSEC_IN_SECONDS * SEC_IN_MINUTES;

export function serialize(url: string, params: Object) {
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
}

export class ResponseError extends ExtendableError {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export function appendSuffix(day: number): string {
  return day === 1
    ? `${day}st`
    : day === 2
        ? `${day}nd`
        : day === 3 ? `${day}rd` : day === 4 ? `${day}th` : `${day}th`;
}

export function dateString(time: Date): string {
  return `${week[time.getDay()]}, ` +
    `${month[time.getMonth()]} ` +
    `${appendSuffix(time.getDate())}`;
}

export const convertFahrenheitToCelsius = (temp: number) =>
  Math.round(temp * 1.8 + 32);
