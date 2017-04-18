export default class Timer {
  game: Simon;

  constructor(game) {
    this.game = game;
    this.current = 0;
    this.cycle = cycle;
  }

  reset() {
    this.current = 0;
  }

  increment(val: number = 1) {
    this.current += val;
  }

  decrement(val: number = 1) {
    this.current -= val;
  }

  tick(simon: Simon, colors: ColorHandler, update: (score: number) => void) {
    if (this.current > this.cycle.length) {
      console.warn('current game step exceeds possible steps, resetting');
      this.reset();
    }

    const self = this;
    const { simon } = this;
    switch (this.cycle[this.current]) {
      // advance[0] = f: (null|restart) -> (end-start)
      case 'start':
        return {
          next: true,
          round: delay['start'],
          action: () => {
            self.increment();
            colors.showAll();
          },
        };
      // advance[1] = f: (start) -> (show-sequence)
      case 'end-start':
        return {
          next: true,
          round: delay['end-start'],
          action: () => {
            self.increment();
            colors.hideAll();
          },
        };
      // advance[2] = f: (show-sequence) -> (show-step)
      case 'show-sequence':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            self.increment();
          },
        };
      // advance[3] = f: (show-sequence) -> (show-step)
      case 'show-step-pause':
        return {
          next: true,
          round: delay['show-sequence-pause'],
          action: () => {
            self.increment();
          },
        };
      // advance[3] = f: (show-sequence) -> (hide-step)
      case 'show-step':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            self.increment();
            colors.showColor(simon.currentColor());
          },
        };
      // advance[4] = f: (show-step) -> (show-step|hide-sequence)
      case 'hide-step':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            if (simon.showSequenceOver()) {
              self.increment();
            } else {
              self.decrement(2);
            }

            colors.hideColor(simon.currentColor());
            simon.nextColor();
          },
        };
      // advance[5] = f: (hide-step) -> (start-input)
      case 'hide-sequence':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            self.increment();
          },
        };
      // advance[6] = f: (start-input) -> (end-input)
      case 'start-input':
        return {
          next: true,
          round: delay['start-input'],
          action: () => {
            self.increment();
            simon.startInput();
          },
        };
      // advance[7] = f: (null|start-input) -> (successful-round|failed-round)
      case 'end-input':
        return {
          next: true,
          round: delay['end-input'],
          action: () => {
            // If player has won, jump to successful-round
            // else forward to failed-round
            if (simon.hasWon()) {
              self.increment();
            }

            self.increment();
            simon.endInput();
          },
        };
      // advance[8] = f: (failed-round) -> (end)
      case 'failed-round':
        return {
          next: true,
          round: delay['failed-round'],
          action: () => {
            self.increment();
            simon.failedRound();
            colors.gameLost();
          },
        };
      // advance[9] = f: (successful-round) -> (failed-round)
      case 'successful-round':
        return {
          next: true,
          round: delay['successful-round'],
          action: () => {
            self.increment();
            simon.wonRound();
            colors.gameWon();
          },
        };
      // advance[10] = f: (end) -> (null|start)
      case 'end':
        return {
          next: false,
          round: delay['end'],
          action: () => {
            self.reset();
            simon.reset();
            colors.roundEnd();
            update();
          },
        };
    }
  }
}
