/* @flow */

const delay = {
  start: 1000,
  'end-start': 0,
  'show-sequence': 0,
  'show-step-pause': 1000,
  'show-step': 1000,
  'hide-step': 1000,
  'hide-sequence': 0,
  'start-input': 1000,
  'end-input': 0,
  'failed-round': 0,
  'successful-round': 0,
  end: 0,
};

const cycle = [
  'start',
  'end-start',
  'show-sequence',
  'show-step-pause',
  'show-step',
  'hide-step',
  'hide-sequence',
  'start-input',
  'end-input',
  'failed-round',
  'successful-round',
  'end',
];

export { delay, cycle };
