/* @flow */

import type { ColorKeys, SimonState } from '../simon.types';

const COLORS = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

const simonState = (state: SimonState) => ({
  input: false,
  power: false,
  strict: false,
  score: 0,
  round: [],
  colors: COLORS,
  failure: false,
  step: 0,
  attempt: [],
});

const toggleState = (state: SimonState) => state.power = !state.power;

const hasPower = ({ power }: SimonState) => power;

const isStrict = ({ strict }: SimonState) => strict;

const toggleStrict = (state: SimonState) => state.strict = !state.strict;

const randomColor = (state: SimonState) => {
  const rand = Math.floor(Math.random() * 4);
  return Object.keys(COLORS)[rand];
};

const resetSimon = (state: SimonState) =>
  Object.assign(state, {
    failure: false,
    score: 0,
    round: [randomColor(state)],
    step: 0,
  });

const setInput = (state: SimonState, input: boolean) => state.input = input;

const playerCanMove = ({ input }: SimonState) => input;

const hasWonGame = ({ score }: SimonState) => score >= 20;

const hasWonRound = ({ attempt, round }: SimonState) =>
  attempt.length >= round.length;

const showSequenceOver = ({ step, round }: SimonState) =>
  step >= round.length - 1;

const getScore = ({ score }: SimonState) => score;

const move = (state: SimonState, color: ColorKeys) => {
  let nextState;
  if (state.round[state.step] === color) {
    state.attempt.push(color);
    state.step += 1;
  } else if (state.strict) {
    state.attempt = [];
    state.round = [randomColor()];
    state.failure = true;
    state.step = 0;
  } else {
    state.failure = true;
    state.step = 0;
  }
};

const currentColor = ({ round, step }: SimonState) => round[step];

const nextColor = (state: SimonState) => state.step += 1;

const hasFailedRound = ({ failure }: SimonState) => failure;

export {
  COLORS,
  simonState,
  toggleState,
  hasPower,
  isStrict,
  toggleStrict,
  randomColor,
  resetSimon,
  setInput,
  playerCanMove,
  hasWonGame,
  hasWonRound,
  showSequenceOver,
  getScore,
  move,
  currentColor,
  nextColor,
  hasFailedRound,
};
