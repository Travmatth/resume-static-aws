/* @flow */
import { week, month, } from './constants';

import ExtendableError from 'extendable-error-class';

export function serialize(url: string, params: Object) {
  const query = [];

  if (params !== undefined) 
    url += "?"

  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      query.push(encodeURIComponent(property) 
        + "=" 
        + encodeURIComponent(params[property]));
    }
  }

  return url + query.join("&");
}

export class ResponseError extends ExtendableError {
    response: Response;
    
    constructor(message: string, response: Response) {
      super(message);
      this.response = response
    }
}

export function appendSuffix(day: number): string {
  return (
    day === 1 ? `${day}st` :
    day === 2 ? `${day}nd` :
    day === 3 ? `${day}rd` :
    day === 4 ? `${day}th` :
    `${day}th`
  )
}

export function dateString(time: Date): string {
  return `${week[time.getDay()]}, ` 
    + `${month[time.getMonth()]} ` 
    + `${appendSuffix(time.getDate())}`
}

export const convertFahrenheitToCelsius = (temp: number) => (
  Math.round(temp * 1.8 + 32)
);