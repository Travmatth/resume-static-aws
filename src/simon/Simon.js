/*
resetRound
roundLength
roundCountinue
roundSuccess
roundFailure
strictness
power
turn
advanceRound
winGame
 */

class Simon {
  constructor() {
    this.power = false;
    this.strict = false;
  }

  power() {
    return this.power;
  }

  state(state: boolean) {
    this.power = state;
  }

  strict(state: boolean) {
    this.strict = state;
  }

  isStrict() {
    return this.strict;
  }

  initialSequence() {}
  attemptPress() {}
  currentColorDisplayed() {}
  shouldRestartRound() {}
  advanceRound() {}
  totalRounds() {}
  endRound() {}
  totalMoves() {}
}

export { Simon };
