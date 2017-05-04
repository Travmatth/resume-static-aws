/* @flow */
'use strict';
import {
  parseTimeToText,
  padLeft,
  serialize,
  dateString,
  ResponseError,
  appendSuffix,
  convertFahrenheitToCelsius,
} from '../utils';

//49,54,62,68
describe('Shared utility code', () => {
  it('ResponseError is an error with a response property', () => {
    try {
      const err = new ResponseError('test-string', 'test-val');
      throw err;
    } catch (resErr) {
      expect(resErr.response).toBe('test-val');
    }
  });

  it('parseTimeToText should do so', () => {
    const time = 1493851775647;
    const current = parseTimeToText(time);
    expect(current).toBe('49:35.647');
  });

  it("padLeft should prepend 0's to given string", () => {
    const str = padLeft('test', 8);
    expect(str).toBe('0000test');
  });

  it('serialize should omit ? when no params present', () => {
    const url = serialize('test');
    expect(url).toBe('test');
  });

  it('serialize should write object into params', () => {
    const url = serialize('test', { k1: 'v1', k2: 'v2' });
    expect(url).toBe('test?k1=v1&k2=v2');
  });

  it('appendSuffix should add (st) when day is 1', () => {
    expect(appendSuffix(1)).toBe('1st');
  });

  it('appendSuffix should add (nd) when day is 2', () => {
    expect(appendSuffix(2)).toBe('2nd');
  });

  it('appendSuffix should add (rd) when day is 3', () => {
    expect(appendSuffix(3)).toBe('3rd');
  });

  it('appendSuffix should add (th) when day is >3', () => {
    expect(appendSuffix(4)).toBe('4th');
  });

  it('dateString should convert date -> string', () => {
    const date = new Date();
    expect(dateString(date)).toBe('Wednesday, May 3rd');
  });

  it('convertFahrenheitToCelsius should convert fahrenheit -> celsius', () => {
    expect(convertFahrenheitToCelsius(100)).toBe(38);
  });
});
