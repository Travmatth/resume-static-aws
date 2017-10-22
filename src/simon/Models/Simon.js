/* @flow */

import type { ColorKeys, SimonState } from '../simon.types';

const TOTAL_ROUNDS = 20;

const COLORS = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

const simonState = () => ({
  COLORS,
  power: false,
  input: false,
  score: 0,
  failure: false,
  round: [],
  gameplayStep: 0,
  attemptStep: 0,
  strict: false,
});

const hasWonRound = ({ attemptStep, round }: SimonState) =>
  attemptStep >= round.length;
const showSequenceOver = ({ gameplayStep, round }: SimonState) =>
  gameplayStep >= round.length - 1;
const currentGameplayColor = ({ round, gameplayStep }: SimonState) =>
  round[gameplayStep];
const hasFailedRound = ({ failure, attemptStep, gameplayStep }: SimonState) =>
  attemptStep < gameplayStep || failure;

const nextGameplayColor = (state: SimonState) => state.gameplayStep += 1;
const resetAttemptStep = (state: SimonState) => state.attemptStep = 0;
const setInput = (state: SimonState, input: boolean) => state.input = input;
const hasWonGame = ({ score }: SimonState) => score >= TOTAL_ROUNDS;
const incrementScore = (state: SimonState) => state.score += 1;
const toggleState = (state: SimonState) => state.power = !state.power;
const toggleStrict = (state: SimonState) => state.strict = !state.strict;

const randomColor = () => {
  const UPPER_BOUND = 4;
  const rand = Math.floor(Math.random() * UPPER_BOUND);
  return Object.keys(COLORS)[rand];
};

const addGameplayColor = (state: SimonState) =>
  Object.assign(state, {
    round: state.round.concat(randomColor()),
  });

const resetSimon = (state: SimonState) =>
  Object.assign(state, {
    score: 0,
    failure: false,
    round: [randomColor()],
    gameplayStep: 0,
    attemptStep: 0,
  });

const restartRound = (state: SimonState) =>
  Object.assign(state, {
    failure: false,
    gameplayStep: 0,
    attemptStep: 0,
  });

const nextRound = (state: SimonState) =>
  Object.assign(state, {
    failure: false,
    round: state.round.concat(randomColor()),
    gameplayStep: 0,
  });

const recordPlayerAttempt = (state: SimonState, color: ColorKeys) => {
  const { strict } = state;
  if (state.round[state.attemptStep] === color) {
    state.attemptStep += 1;
    if (state.attemptStep >= state.round.length) {
      incrementScore(state);
      state.playerInputFinished = true;
    }
  } else if (strict) {
    state.round = [randomColor()];
    state.failure = true;
    state.attemptStep = 0;
    state.gameplayStep = 0;
  } else {
    state.failure = true;
    state.attemptStep = 0;
    state.gameplayStep = 0;
  }
};

export {
  TOTAL_ROUNDS,
  COLORS,
  simonState,
  addGameplayColor,
  resetSimon,
  setInput,
  hasWonGame,
  hasWonRound,
  showSequenceOver,
  recordPlayerAttempt,
  currentGameplayColor,
  nextGameplayColor,
  hasFailedRound,
  toggleState,
  toggleStrict,
  randomColor,
  nextRound,
  incrementScore,
  resetAttemptStep,
  restartRound,
};
