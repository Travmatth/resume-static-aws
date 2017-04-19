class Simon {
  constructor() {
    this.power = false;
    this.strict = false;
    this.score = 0;
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
  setPlayerCanMove(move: boolean) {
    this.input = move;
  }

  playerCanMove() {
    return this.input;
  }

  hasWonGame() {
    if (this.score === 20) return true;
    return false;
  }

  hasWonRound() {
    if (this.roundScore >= this.round.length) return true;
    return false;
  }

  showSequenceOver() {
    if (this.sequenceStep() >= this.round.length) return true;
    return false;
  }

  startInput() {
    this.input = true;
  }

  // Game functionality
  move(color: Color) {
    // if player can move; do so
    // else return false?
  }

  currentColor() {}

  nextColor() {}

  endInput() {
    this.input = false;
  }

  failedRound() {}

  reset() {}
}

export { Simon };
