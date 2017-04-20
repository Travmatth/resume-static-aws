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

  tick(simon: Simon, buttons: ColorHandler) {
    if (this.current > this.cycle.length) {
      console.warn('current game step exceeds possible steps, resetting');
      this.reset();
    }

    const { simon } = this;
    switch (this.cycle[this.current]) {
      // prettier-ignore

      // advance[0] = f: (null|restart) -> (end-start)
      case 'start':
        return {
          next: true,
          round: delay['start'],
          action: () => {
            this.increment();
            buttons.showAll();
          },
        };
      // prettier-ignore

      // advance[1] = f: (start) -> (show-sequence)
      case 'end-start':
        return {
          next: true,
          round: delay['end-start'],
          action: () => {
            this.increment();
            buttons.hideAll();
          },
        };
      // prettier-ignore

      // advance[2] = f: (show-sequence) -> (show-step)
      case 'show-sequence':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            this.increment();
          },
        };
      // prettier-ignore

      // advance[3] = f: (show-sequence) -> (show-step)
      case 'show-step-pause':
        return {
          next: true,
          round: delay['show-sequence-pause'],
          action: () => {
            this.increment();
          },
        };
      // prettier-ignore

      // advance[3] = f: (show-sequence) -> (hide-step)
      case 'show-step':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            this.increment();
            buttons.showColor(simon.currentColor());
          },
        };
      // prettier-ignore

      // advance[4] = f: (show-step) -> (show-step|hide-sequence)
      case 'hide-step':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            if (simon.showSequenceOver()) {
              this.increment();
            } else {
              this.decrement(2);
            }

            buttons.hideColor(simon.currentColor());
            simon.nextColor();
          },
        };
      // prettier-ignore

      // advance[5] = f: (hide-step) -> (start-input)
      case 'hide-sequence':
        return {
          next: true,
          round: delay['show-sequence'],
          action: () => {
            this.increment();
          },
        };
      // prettier-ignore

      // advance[6] = f: (start-input) -> (end-input)
      case 'start-input':
        return {
          next: true,
          round: this.round.length * 2.5 * 1000,
          action: () => {
            this.increment();
            simon.setInput(true);
          },
        };
      // prettier-ignore

      // advance[7] = f: (null|start-input) -> (successful-round|failed-round)
      case 'end-input':
        return {
          next: true,
          round: delay['end-input'],
          action: () => {
            // If player has won, jump to successful-round
            // else forward to failed-round
            if (simon.hasWonRound() || simon.hasWonGame()) {
              this.increment();
            }

            this.increment();
            simon.setInput(false);
          },
        };
      // prettier-ignore

      // advance[10] = f: (end) -> (null|start)
      case 'end':
        return {
          next: false,
          round: delay['end'],
          action: () => {
            this.reset();
            simon.reset();
          },
        };
    }
  }
}
