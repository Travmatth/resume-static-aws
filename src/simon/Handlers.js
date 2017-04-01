/* @flow */
import type { ColorKeys, ColorButtons } from './simon.types';
import { Colors } from './simon.types';

// holds id of current setTimeout
let timer,
  // holds id of current setInterval
  sequence,
  // current round of game, i.e. how many presses in current sequence
  round = 0;
// current move being shown to player
currentMove = 0;

const delay = 1000;
const roundDelay = delay * 10;
const seqDelay = delay;
const flash = delay * 0.9;

const roundHandler = (simon: Simon, colors: ColorManager) => {
  // Player can advance round when all colors in sequence have been pressed
  if (round < simon.totalRounds()) {
    round += 1;
    simon.advanceRound();
    sequence = setInterval(fireSequence, seqDelay, simon, colors);
  } else {
    round = 0;
    simon.endRound();
    cancelAll();
  }
};

// Responsible for flashing pattern of colors each turn to user
const fireSequence = (simon: Simon, colors: ColorManager) => {
  if (currentMove < simon.totalMoves()) {
    currentMove += 1;
    const current = simon.currentColorDisplayed();
    colors.showColor(current);
  } else {
    clearInterval(sequence);
    simon.finishedComputerSequence();
    currentMove = 0;
  }
};

const startAll = (simon: Simon, colors: ColorManager) => {
  timer = setTimeout(roundHandler, roundDelay, simon, colors);
  sequence = setInterval(fireSequence, seqDelay, simon, colors);
};

const cancelAll = () => {
  clearTimeout(timer);
  clearInterval(sequence);
};

const startHandler = (simon: Simon, colors: ColorsManager) =>
  (e: Event) => simon.power() ? startAll(simon, colors) : cancelAll();

class ColorHandler {
  button: ColorButtons;

  constructor(buttons: ColorButtons) {
    this.buttons = buttons;
  }

  showHandler(color: ColorKeys) {
    return (e: Event) => {
      e.preventDefault();
      // Show color
    };
  }

  hideHandler(color: ColorKeys) {
    return (e: Event) => {
      e.preventDefault();
      // Hide color
    };
  }

  display(color: ColorKeys) {
    // Show color
    return () => {
      // Stop showing color
    };
  }

  showColor(color: ColorKeys) {
    setTimeout(this.display(color), flash);
  }
}

export { startAll, startHandler, cancelAll, ColorHandler };
