/* @flow */

const Color = { red: 'red', green: 'green', yellow: 'yellow', blue: 'blue' };
import typeof { cycle as Cycle } from './Models';
export type Sound = $Keys<typeof Color> | 'won' | 'lost' | 'start';
export type ColorKeys = $Keys<typeof Color>;
export type ColorButtons = { [key: ColorKeys]: HTMLButtonElement };
export type TimerState = {
  current: number,
  cycle: Cycle,
};
export type SimonState = {
  input: boolean,
  power: boolean,
  strict: boolean,
  score: number,
  round: Array<$Keys<typeof Color>>,
  colors: Color,
  failure: boolean,
  step: number,
  attempt: Array<$Keys<typeof Color>>,
};
