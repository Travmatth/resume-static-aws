/* @flow */
/* eslint-env jest */

import { SoundManager } from '../Models';

describe('Simon Sounds', () => {
  let sound: SoundManager;

  beforeEach(() => sound = new SoundManager());

  it('play should call set currentTime and call play on specified sound', () => {
    //$FlowIgnore
    sound.tones.red.play = jest.fn();

    sound.play('red');

    expect(sound.tones.red.currentTime).toBe(0);
    expect(sound.tones.red.play).toHaveBeenCalled();
  });

  it('pause should call set pause on specified sound', () => {
    //$FlowIgnore
    sound.tones.red.pause = jest.fn();

    sound.pause('red');

    expect(sound.tones.red.pause).toHaveBeenCalled();
  });
});
