import { Colors } from '../simon.types';

class Simon {
  constructor() {
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
    return this.score >= 20 ? true : false;
  }

  hasWonRound() {
    return this.roundScore >= this.round.length ? true : false;
  }

  showSequenceOver() {
    return this.sequenceStep() >= this.round.length ? true : false;
  }

  // Game functionality
  move(color: Color) {
    const pos = this.attempt[this.attempt.length];

    if (this.round[pos] === color) {
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

  failedRound() {
    return this.failure;
  }
}

export { Simon };
