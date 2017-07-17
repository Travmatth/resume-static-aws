/* @flow */

import type { STATE, PHASE } from '../Models';
export type Timer = {| 'work': number, 'rest': number |};
export type Game = {
  id: ?number,
  phase: $Keys<typeof PHASE>,
  state: $Keys<typeof STATE>,
};
