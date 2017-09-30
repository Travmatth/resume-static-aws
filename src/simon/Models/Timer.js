/* @flow */

import {
  currentGameplayColor,
  nextGameplayColor,
  setInput,
  showSequenceOver,
  nextRound,
  resetSimon,
  hasFailedRound,
  hasWonRound,
  hasWonGame,
  resetAttemptStep,
  isStrict,
  restartRound,
} from './Simon';
import type { TimerState, SimonState } from '../simon.types';
import { cycle, delay } from './GameCycle';
import { showColor, hideColor, hideAll, showAll } from '../Handlers';

const timerState: TimerState = () => ({ current: 0, cycle });

const resetTimer = (state: TimerState) => state.current = 0;

const incrementGamePlayState = (state: TimerState, val: number = 1) =>
  state.current += val;

const decrementGamePlayState = (state: TimerState, val: number = 1) =>
  state.current -= val;

const tick = (
  state: TimerState,
  simon: SimonState,
  sounds: SoundManager,
  buttons: ColorButtons,
) => {
  const { cycle } = state;
  if (state.current < 0 || state.current > cycle.length) {
    console.warn('current game step exceeds possible steps, resetting');
    resetTimer(state);
  }

  switch (cycle[state.current]) {
    // prettier-ignore

    // advance[0] = f: (null|restart) -> (end-start)
    case 'start':
      return {
        next: true,
        round: delay['start'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[1] = f: (start) -> (show-sequence)
    case 'end-start':
      return {
        next: true,
        round: delay['end-start'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[2] = f: (show-sequence) -> (show-step)
    case 'show-sequence':
      return {
        next: true,
        round: delay['show-sequence'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[3] = f: (show-sequence) -> (show-step)
    case 'show-step-pause':
      return {
        next: true,
        round: delay['show-step-pause'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[4] = f: (show-sequence) -> (hide-step)
    case 'show-step':
      return {
        next: true,
        round: delay['show-step'],
        action: () => {
          incrementGamePlayState(state);
          showColor(currentGameplayColor(simon), sounds, buttons);
        },
      };
    // prettier-ignore

    // advance[5] = f: (show-step) -> (show-step|hide-sequence)
    case 'hide-step':
      return {
        next: true,
        round: delay['hide-step'],
        action: () => {
          if (showSequenceOver(simon)) {
            incrementGamePlayState(state);
          } else {
            decrementGamePlayState(state, 2);
          }

          hideColor(currentGameplayColor(simon), sounds, buttons);
          nextGameplayColor(simon);
        },
      };
    // prettier-ignore

    // advance[6] = f: (hide-step) -> (start-input)
    case 'hide-sequence':
      return {
        next: true,
        round: delay['hide-sequence'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[7] = f: (start-input) -> (end-input)
    case 'start-input':
      return {
        next: true,
        round: simon.round.length * 3 * 1000,
        action: () => {
          incrementGamePlayState(state);
          setInput(simon, true);
        },
      };
    // prettier-ignore

    // advance[8] = f: (null|start-input) -> (failed-round|successful-round)
    case 'end-input':
      return {
        next: true,
        round: delay['end-input'],
        action: () => {
          incrementGamePlayState(state);

          // If game won
          if (hasWonRound(simon)) {
            resetAttemptStep(simon);

            // During game end
            if (hasWonGame(simon)) {
              resetSimon(simon);
              showAll(sounds, buttons);
            // During round end
            } else {
              nextRound(simon);
            };

          // If failure
          } else if (hasFailedRound(simon)) {
            // During strict game, should restart
            if (isStrict(simon)) {
              resetSimon(simon);
              sounds.play('lost');
            // During regular game, should restart round
            } else {
              restartRound(simon);
            };

          // If correct move, do nothing
          } else {
            nextRound(simon);
          }
        },
      };
    // prettier-ignore

    // advance[9] = f: (end) -> (null|start)
    case 'failed-round':
      return {
        next: true,
        round: delay['failed-round'],
        action: () => {
          // jump to end
          incrementGamePlayState(state, 2);
        },
      };
    // prettier-ignore

    // advance[10] = f: (end) -> (null|start)
    case 'successful-round':
      return {
        next: true,
        round: delay['successful-round'],
        action: () => {
          incrementGamePlayState(state);
        },
      };
    // prettier-ignore

    // advance[11] = f: (end) -> (null|start)
    case 'end':
      return {
        next: true,
        round: delay['end'],
        action: () => {
          resetTimer(state);
          hideAll(sounds, buttons);
        },
      };
    // prettier-ignore

    default:
      console.error('Error: Unrecognized step: ', state.cycle[state.current]);
      return {
        next: false,
        round: 0,
        action: () => {},
      };
  }
};

export {
  timerState,
  resetTimer,
  incrementGamePlayState,
  decrementGamePlayState,
  tick,
};
