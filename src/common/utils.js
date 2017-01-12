/* @flow */
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
