/* @flow */

import {
  COLORS,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  showAll,
  hideAll,
  showColor,
  hideColor,
  showHighlight,
  hideHighlight,
} from './ColorHandlers';
import { cancelTimer, advance, powerOn, powerOff, fire } from './TimerHandler';
import {
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  startHandler,
} from './ButtonHandlers';

export {
  startHandler,
  COLORS,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  showAll,
  hideAll,
  showColor,
  hideColor,
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  cancelTimer,
  advance,
  powerOn,
  powerOff,
  fire,
};
