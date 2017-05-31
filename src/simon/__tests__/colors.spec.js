/* @flow */
import { ColorHandler } from '../Handlers';

describe('Simon Colors', () => {
  let color: ColorHandler;
  let buttons: { [string]: HTMLElement };
  let sounds: { play: Function, pause: Function };

  beforeEach(() => {
    buttons = {
      red: document.createElement('div'),
      yellow: document.createElement('div'),
      green: document.createElement('div'),
      blue: document.createElement('div'),
    };

    Object.keys(buttons).forEach(color => buttons[color].classList.add(color));

    sounds = {
      play: jest.fn(),
      pause: jest.fn(),
    };

    color = new ColorHandler(buttons, sounds);
  });

  it('swapCss should toggle css classes on color elements', () => {
    color.swapCss('red');
    expect(buttons['red'].className).toBe('light-red');

    color.swapCss('red');
    expect(buttons['red'].className).toBe('red');
  });

  it('showColor should play sound & toggle css', () => {
    color.showColor('red');
    expect(sounds.play).toHaveBeenCalled();
    expect(buttons['red'].className).toBe('light-red');
  });

  it('hideColor should stop sound & toggle css', () => {
    color.showColor('red');
    color.hideColor('red');

    expect(sounds.pause).toHaveBeenCalled();
    expect(buttons['red'].className).toBe('red');
  });

  it('startSound should play sound', () => {
    color.startSound('red');
    expect(sounds.play).toHaveBeenCalled();
  });

  it('endSound should stop sound', () => {
    color.endSound('red');
    expect(sounds.pause).toHaveBeenCalled();
  });

  it('flash should display color & start sound, then end both', () => {
    const showAll = jest.spyOn(color, 'showAll').mockImplementation(() => {});
    const startSound = jest
      .spyOn(color, 'startSound')
      .mockImplementation(() => {});
    const hideAll = jest.spyOn(color, 'hideAll').mockImplementation(() => {});
    const endSound = jest.spyOn(color, 'endSound').mockImplementation(() => {});
    const resume = jest.fn();

    color.flash('', resume);

    expect(showAll).toHaveBeenCalled();
    expect(startSound).toHaveBeenCalled();

    jest.runTimersToTime(1000);

    expect(hideAll).toHaveBeenCalled();
    expect(endSound).toHaveBeenCalled();
    expect(resume).toHaveBeenCalled();
  });

  it("wonGame should flash 'won'", () => {
    const resume = jest.fn();
    const spy = jest.spyOn(color, 'flash').mockImplementation(() => {});
    color.wonGame(resume);

    expect(spy).toHaveBeenCalled();
  });

  it("wonRound should flash 'won'", () => {
    const resume = jest.fn();
    const spy = jest.spyOn(color, 'flash').mockImplementation(() => {});
    color.wonRound(resume);

    expect(spy).toHaveBeenCalled();
  });

  it('wonStart should flash all colors, start won audio', () => {
    color.startSound = jest.fn();
    color.showAll = jest.fn();

    color.wonStart();

    expect(color.startSound).toHaveBeenCalledWith('won');
    expect(color.showAll).toHaveBeenCalled();
  });

  it('wonEnd should flash all colors, start won audio', () => {
    color.endSound = jest.fn();
    color.hideAll = jest.fn();

    color.wonEnd();

    expect(color.endSound).toHaveBeenCalledWith('won');
    expect(color.hideAll).toHaveBeenCalled();
  });

  it('failStart should flash all colors, start fail audio', () => {
    color.startSound = jest.fn();
    color.showAll = jest.fn();

    color.failStart();

    expect(color.startSound).toHaveBeenCalledWith('lost');
    expect(color.showAll).toHaveBeenCalled();
  });

  it('failEnd should flash all colors, end fail audio', () => {
    color.endSound = jest.fn();
    color.hideAll = jest.fn();

    color.failEnd();

    expect(color.endSound).toHaveBeenCalledWith('lost');
    expect(color.hideAll).toHaveBeenCalled();
  });

  it("strictFail should flash 'lost'", () => {
    const resume = jest.fn();
    const spy = jest.spyOn(color, 'flash').mockImplementation(() => {});
    color.strictFail(resume);

    expect(spy).toHaveBeenCalled();
  });

  it("restartRound should flash 'start'", () => {
    const resume = jest.fn();
    const spy = jest.spyOn(color, 'flash').mockImplementation(() => {});
    color.restartRound(resume);

    expect(spy).toHaveBeenCalled();
  });

  it('showAll should flash all colors', () => {
    color.showColor = jest.fn();
    color.showAll();

    expect(color.showColor).toHaveBeenCalledTimes(4);
  });

  it('hideAll should hide all colors', () => {
    color.hideColor = jest.fn();
    color.hideAll();

    expect(color.hideColor).toHaveBeenCalledTimes(4);
  });
});
