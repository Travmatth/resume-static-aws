/* @flow */
import { dispatch } from 'tests/utils';
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
  shrink,
  scale,
  checkForNegativeZero,
  registerToggle,
} from '../js/utils';

//49,54,62,68
describe('Shared utility code', () => {
  it('registerToggle should set a toggle on dropdown element', () => {
    document.body.innerHTML = `
      <body>
        <p id="projects-btn"></p>
        <p class="dropdown"></p>
      </body>
    `;
    const button = document.getElementById('projects-btn');
    const target = document.querySelector('.dropdown');

    registerToggle(button, target);
    dispatch(button, 'click');

    expect(target.classList.contains('is-open')).toBe(true);
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

  it('scale should convert from int -> ms', () => {
    expect(scale(1)).toBe(60000);
  });

  it('shrink should convert from ms -> int', () => {
    expect(shrink(60000)).toBe(1);
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
      status: 200,
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
});
