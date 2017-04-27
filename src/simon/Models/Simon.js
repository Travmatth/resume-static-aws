/* @flow */

import type { ColorKeys } from '../simon.types';

const Colors = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

class Simon {
  power: boolean;
  strict: boolean;
  score: number;
  round: Array<ColorKeys>;
  attempt: Array<ColorKeys>;
  colors: { red: 'red', yellow: 'yellow', blue: 'blue', green: 'green', };
  failure: boolean;
  step: number;
  input: boolean;

  constructor() {
    this.input = false;
    this.power = false;
    this.strict = false;
    this.score = 0;
    this.round = [];
    this.colors = Colors;
    this.failure = false;
    this.step = 0;
  }

  // Power
  toggleState() {
    this.power = !this.power;
  }

  hasPower() {
    return this.power;
  }

  isStrict() {
    return this.strict;
  }

  toggleStrict() {
    this.strict = !this.strict;
  }

  // Game state
  randomColor() {
    const rand = Math.floor(Math.random() * 5);
    return this.colors[rand];
  }

  reset() {
    this.failure = false;
    this.score = 0;
    this.round = [this.randomColor()];
    this.step = 0;
  }

  end() {}

  setInput(input: boolean) {
    this.input = input;
  }

  playerCanMove() {
    return this.input;
  }

  hasWonGame() {
    return this.score >= 20;
  }

  hasWonRound() {
    return this.attempt.length >= this.round.length;
  }

  showSequenceOver() {
    return this.step >= this.round.length;
  }

  // Game functionality
  getScore() {
    return this.score;
  }

  move(color: ColorKeys) {
    if (this.round[this.step] === color) {
      // if player can move; do so
      this.attempt.push(color);
      this.step += 1;
    } else if (this.strict) {
      this.attempt = [];
      this.round = [this.randomColor()];
      this.failure = true;
      this.step = 0;
    } else {
      this.failure = true;
      this.step = 0;
    }
  }

  currentColor() {
    return this.round[this.step];
  }

  nextColor() {
    this.step += 1;
  }

  hasFailedRound() {
    return this.failure;
  }
}

export { Colors, Simon };
