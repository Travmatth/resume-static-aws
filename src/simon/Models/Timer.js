/* @flow */

import {
  currentColor,
  nextColor,
  setInput,
  showSequenceOver,
  hasWonRound,
  hasWonGame,
  resetSimon,
} from './Simon';
import type { TimerState, SimonState } from '../simon.types';
import { cycle, delay } from './GameCycle';
import {
  flash,
  showAll,
  hideAll,
  showColor,
  hideColor,
  failStart,
  wonStart,
  wonEnd,
  failEnd,
} from '../Handlers';

const timerState: TimerState = () => ({ current: 0, cycle });

const resetTimer = (state: TimerState) => state.current = 0;

const increment = (state: TimerState, val: number = 1) => state.current += val;

const decrement = (state: TimerState, val: number = 1) => state.current -= val;

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
          console.log('start: ', state.current, simon.round);
          //debugger;
          increment(state);
          showAll(sounds, buttons);
        },
      };
    // prettier-ignore

    // advance[1] = f: (start) -> (show-sequence)
    case 'end-start':
      return {
        next: true,
        round: delay['end-start'],
        action: () => {
          console.log('end-start: ', state.current, simon.round);
          //debugger;
          increment(state);
          hideAll(sounds, buttons);
        },
      };
    // prettier-ignore

    // advance[2] = f: (show-sequence) -> (show-step)
    case 'show-sequence':
      return {
        next: true,
        round: delay['show-sequence'],
        action: () => {
          console.log('show-sequence: ', state.current, simon.round);
          //debugger;
          increment(state);
        },
      };
    // prettier-ignore

    // advance[3] = f: (show-sequence) -> (show-step)
    case 'show-step-pause':
      return {
        next: true,
        round: delay['show-step-pause'],
        action: () => {
          console.log('show-step-pause: ', state.current, simon.round);
          //debugger;
          increment(state);
        },
      };
    // prettier-ignore

    // advance[4] = f: (show-sequence) -> (hide-step)
    case 'show-step':
      return {
        next: true,
        round: delay['show-step'],
        action: () => {
          console.log('show-step: ', state.current, simon.round);
          //debugger;
          increment(state);
          showColor(currentColor(simon), sounds, buttons);
        },
      };
    // prettier-ignore

    // advance[5] = f: (show-step) -> (show-step|hide-sequence)
    case 'hide-step':
      return {
        next: true,
        round: delay['hide-step'],
        action: () => {
          console.log('hide-step: ', state.current, simon.round);
          //debugger;

          debugger;
          if (showSequenceOver(simon)) {
            increment(state);
          } else {
            decrement(state, 2);
          }
          hideColor(currentColor(simon), sounds, buttons);
          nextColor(simon);
        },
      };
    // prettier-ignore

    // advance[6] = f: (hide-step) -> (start-input)
    case 'hide-sequence':
      return {
        next: true,
        round: delay['hide-sequence'],
        action: () => {
          console.log('hide-sequence: ', state.current, simon.round);
          //debugger;
          increment(state);
        },
      };
    // prettier-ignore

    // advance[7] = f: (start-input) -> (end-input)
    case 'start-input':
      return {
        next: true,
        round: simon.round.length * 2.5 * 1000,
        action: () => {
          console.log('start-input: ', state.current, simon.round);
          //debugger;
          increment(state);
          setInput(simon, true);
        },
      };
    // prettier-ignore

    // advance[8] = f: (null|start-input) -> (successful-round|failed-round)
    case 'end-input':
      return {
        next: true,
        round: delay['end-input'],
        action: () => {
          console.log('end-input: ', state.current, simon.round);
          //debugger;
          // If player has won, jump to successful-round
          // else forward to failed-round
          if (hasWonRound(simon) || hasWonGame(simon)) {
            increment(state, 2);
          } else {
            increment(state);
          }
          setInput(simon, false);
        },
      };
    // prettier-ignore

    // advance[9] = f: (end) -> (null|start)
    case 'failed-round':
      return {
        next: true,
        round: delay['failed-round'],
        action: () => {
          console.log('failed-round: ', state.current, simon.round);
          // jump to end
          failStart(sounds, buttons);
          increment(state, 2);
        },
      };
    // prettier-ignore

    // advance[10] = f: (end) -> (null|start)
    case 'successful-round':
      return {
        next: true,
        round: delay['successful-round'],
        action: () => {
          increment(state);
          wonStart(sounds, buttons);
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
          resetSimon(simon);
          wonEnd(sounds, buttons)
          failEnd(sounds, buttons)
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

export { timerState, resetTimer, increment, decrement, tick };
