/* @flow */
import {
  COLORS,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  showAll,
  hideAll,
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

    Object.keys(COLORS).forEach(color => {
      buttons[color].classList.add(color);
      buttons[color].classList.add = jest.fn();
      buttons[color].classList.remove = jest.fn();
    });

    sounds = ((new Sounds(): any): SoundManager);
    //$FlowIgnore
    sounds.play = jest.fn();
    //$FlowIgnore
    sounds.pause = jest.fn();
  });

  it('showColor should play sound & toggle css', () => {
    showColor(COLORS.red, sounds, buttons);
    expect(sounds.play).toHaveBeenCalled();
    expect(buttons[COLORS.red].classList.add).toHaveBeenCalled();
  });

  it('hideColor should stop sound & toggle css', () => {
    showColor(COLORS.red, sounds, buttons);
    hideColor(COLORS.red, sounds, buttons);

    expect(sounds.pause).toHaveBeenCalled();
    expect(buttons[COLORS.red].className).toBe(COLORS.red);
  });

  it('wonStart should flash all colors, start won audio', () => {
    wonStart(sounds, buttons);
    jest.runTimersToTime(1000);

    expect(sounds.play.mock.calls[0][0]).toEqual('won');
  });

  it('wonEnd should flash all colors, start won audio', () => {
    wonEnd(sounds, buttons);
    jest.runTimersToTime(1000);

    expect(sounds.pause.mock.calls[0][0]).toEqual('won');
  });

  it('failStart should flash all colors, start fail audio', () => {
    failStart(sounds, buttons);
    jest.runTimersToTime(1000);

    expect(sounds.play.mock.calls[0][0]).toEqual('lost');
  });

  it('failEnd should flash all colors, end fail audio', () => {
    failEnd(sounds, buttons);
    jest.runTimersToTime(1000);
    expect(sounds.pause.mock.calls[0][0]).toEqual('lost');
  });

  it('showAll should flash all colors', () => {
    showAll(sounds, buttons);

    Object.keys(COLORS).forEach(color => {
      const css = buttons[color].classList.add.mock.calls[0][0];
      expect(css).toEqual(`light-${color}`);
    });
  });

  it('hideAll should hide all colors', () => {
    hideAll(sounds, buttons);

    Object.keys(COLORS).forEach(color => {
      const css = buttons[color].classList.add.mock.calls[0][0];
      expect(css).toEqual(`${color}`);
    });
  });
});
