/* @flow */
/* eslint-env jest */

import {
  eventType,
  parseTimeToText,
  padLeft,
  serialize,
  dateString,
  ResponseError,
  appendSuffix,
  convertFahrenheitToCelsius,
  checkHeaders,
  shrinkMinutesToInt,
  scaleIntToMinutes,
  checkForNegativeZero,
  trim,
  rand,
  withTimeout,
} from '../js/Utils';

describe('Shared utility code', () => {
  it('trim should remove newline characters', () => {
    const raw = '\ntest\n';
    expect(trim(raw)).toBe('test');
  });

  it('checkForNegativeZero returns 0 if input is -0', () => {
    expect(Object.is(checkForNegativeZero(-0), +0)).toBe(true);
  });

  it('checkForNegativeZero returns 0 if input is 0', () => {
    expect(Object.is(checkForNegativeZero(+0), +0)).toBe(true);
  });

  it('checkForNegativeZero returns input, if input is other integer', () => {
    expect(checkForNegativeZero(-1)).toBe(-1);
  });

  it('ResponseError is an error with a response property', () => {
    try {
      const err = new ResponseError(
        'test-string',
        (('test-val': any): Response),
      );
      throw err;
    } catch (resErr) {
      expect(resErr.response).toBe('test-val');
    }
  });

  it('scaleIntToMinutes should convert from int -> ms', () => {
    expect(scaleIntToMinutes(1)).toBe(60000);
  });

  it('shrinkMinutesToInt should convert from ms -> int', () => {
    expect(shrinkMinutesToInt(60000)).toBe(1);
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
    const date = new Date(1493915890641);
    expect(dateString(date)).toBe('Thursday, May 4th');
  });

  it('convertFahrenheitToCelsius should convert fahrenheit -> celsius', () => {
    expect(convertFahrenheitToCelsius(100)).toBe(38);
  });

  it('checkHeaders should reject on invalid response.status', async () => {
    const res: Response = ({ status: 404 }: any);
    try {
      checkHeaders(res);
    } catch (error) {
      expect(error.response.status === res.status);
    }
  });

  it('checkHeaders should return json if valid response', async () => {
    const res: Response = ({
      ok: true,
      json: () => {
        return Promise.resolve('working');
      },
    }: any);

    expect(await checkHeaders(res)).toBe('working');
  });

  it("eventType should return 'click' on desktop devices", () => {
    delete window['ontouchstart'];

    expect(eventType()).toBe('click');
  });

  it("eventType should return 'touchstart' on mobile devices", () => {
    window.ontouchstart = true;

    expect(eventType()).toBe('touchstart');
  });

  it('rand should return a random number within range', () => {
    const num = rand(9);

    expect(!isNaN(num)).toBe(true);
    expect(num >= 0 && num <= 10).toBe(true);
  });

  it('withTimeout should resolve when request is fulfilled within time limit', async () => {
    await withTimeout(Promise.resolve(), 1000);
    expect(setTimeout).toHaveBeenCalled();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('withTimeout should reject when request is fulfilled outside time limit', async () => {
    try {
      const nonresolvingPromise = new Promise(() => {});
      const promise = withTimeout(nonresolvingPromise, 1000);
      jest.runAllTimers();
      await promise;
    } catch (e) {
      expect(e.message).toBe('timeout');
    }

    expect(setTimeout).toHaveBeenCalled();
    expect(clearTimeout).toHaveBeenCalled();

    /*
    // This code will work on jest 20+, can impl once upgraded
    expect.assertions(1);
    await (withTimeout()).rejects.toEqual(); // equal what??
     */
  });

  it('withTimeout should reject when request is not fulfilled', async () => {
    try {
      await withTimeout(Promise.reject('stub'), 1000);
    } catch (e) {
      expect(e).toBe('stub');
    }

    expect(setTimeout).toHaveBeenCalled();
    expect(clearTimeout).toHaveBeenCalled();
    /*
    // This code will work on jest 20+, can impl once upgraded
    expect.assertions(1);
    await (withTimeout()).rejects.toEqual(); // equal what??
     */
  });
});
