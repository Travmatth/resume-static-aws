/* @flow */
import {
  COLORS,
  flash,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  wonGame,
  wonRound,
  strictFail,
  restartRound,
  showAll,
  hideAll,
  swapCss,
  showColor,
  hideColor,
} from '../Handlers';
import type { SoundManager } from '../Models';

class Sounds {}

describe('Simon COLORS', () => {
  let buttons: { [string]: HTMLElement };
  let sounds: SoundManager;

  beforeEach(() => {
    buttons = {
      red: document.createElement('button'),
      yellow: document.createElement('button'),
      green: document.createElement('button'),
      blue: document.createElement('button'),
    };

    Object.keys(buttons).forEach(color => buttons[color].classList.add(color));

    sounds = ((new Sounds(): any): SoundManager);
    //$FlowIgnore
    sounds.play = jest.fn();
    //$FlowIgnore
    sounds.pause = jest.fn();
  });

  it('swapCss should toggle css classes on color elements', () => {
    swapCss(COLORS.red, buttons);
    expect(buttons[COLORS.red].className).toBe('light-red');

    swapCss(COLORS.red, buttons);
    expect(buttons[COLORS.red].className).toBe(COLORS.red);
  });

  it('showColor should play sound & toggle css', () => {
    showColor(COLORS.red, sounds, buttons);
    expect(sounds.play).toHaveBeenCalled();
    expect(buttons[COLORS.red].className).toBe('light-red');
  });

  it('hideColor should stop sound & toggle css', () => {
    showColor(COLORS.red, sounds, buttons);
    hideColor(COLORS.red, sounds, buttons);

    expect(sounds.pause).toHaveBeenCalled();
    expect(buttons[COLORS.red].className).toBe(COLORS.red);
  });

  it('flash should display color & start sound, then end both', () => {
    const resume = jest.fn();
    const calls = [['red'], ['yellow'], ['blue'], ['green'], ['red']];

    flash('red', resume, sounds, buttons);

    expect(sounds.play.mock.calls).toEqual(calls);

    jest.runTimersToTime(1000);

    expect(sounds.pause.mock.calls).toEqual(calls);
    expect(resume).toHaveBeenCalled();
  });

  it("wonGame should flash 'won'", () => {
    const resume = jest.fn();
    const calls = [['red'], ['yellow'], ['blue'], ['green'], ['won']];

    wonGame(resume, sounds, buttons);
    jest.runTimersToTime(1000);

    expect(sounds.play.mock.calls).toEqual(calls);
    expect(sounds.pause.mock.calls).toEqual(calls);
    expect(resume).toHaveBeenCalled();
  });

  it("wonRound should flash 'won'", () => {
    const resume = jest.fn();
    const calls = [['red'], ['yellow'], ['blue'], ['green'], ['won']];

    wonRound(resume, sounds, buttons);
    jest.runTimersToTime(1000);

    expect(sounds.play.mock.calls).toEqual(calls);
    expect(sounds.pause.mock.calls).toEqual(calls);
    expect(resume).toHaveBeenCalled();
  });

  it('wonStart should flash all colors, start won audio', () => {
    wonStart(sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['won'], ['red'], ['yellow'], ['blue'], ['green']];

    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('wonEnd should flash all colors, start won audio', () => {
    wonEnd(sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['won'], ['red'], ['yellow'], ['blue'], ['green']];

    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('failStart should flash all colors, start fail audio', () => {
    failStart(sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['lost'], ['red'], ['yellow'], ['blue'], ['green']];

    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('failEnd should flash all colors, end fail audio', () => {
    failEnd(sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['lost'], ['red'], ['yellow'], ['blue'], ['green']];

    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it("strictFail should flash 'lost'", () => {
    const resume = jest.fn();
    strictFail(resume, sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['red'], ['yellow'], ['blue'], ['green'], ['lost']];

    expect(sounds.play.mock.calls).toEqual(calls);
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it("restartRound should flash 'start'", () => {
    const resume = jest.fn();
    restartRound(resume, sounds, buttons);
    jest.runTimersToTime(1000);
    const calls = [['red'], ['yellow'], ['blue'], ['green'], ['start']];

    expect(sounds.play.mock.calls).toEqual(calls);
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('showAll should flash all colors', () => {
    const calls = [['red'], ['yellow'], ['blue'], ['green']];
    showAll(sounds, buttons);

    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('hideAll should hide all colors', () => {
    const calls = [['red'], ['yellow'], ['blue'], ['green']];
    hideAll(sounds, buttons);

    expect(sounds.pause.mock.calls).toEqual(calls);
  });
});
