/* @flow */

import type { State, Phase } from '../Models';
export type Timer = {| 'work': number, 'rest': number |};
export type Game = {
  id: ?number,
  phase: $Keys<typeof Phase>,
  state: $Keys<typeof State>,
};
