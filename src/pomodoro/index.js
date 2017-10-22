/* @flow */

import {
  stepperHandler,
  toggleHandler,
  resetHandler,
  setFill,
} from './Handlers';
import { stopTimer, startTimer, STATE, PHASE } from './Models';
import { eventType, scaleIntToMinutes } from 'common/js/Utils';

if (typeof document !== 'undefined') {
  const timeLimit = scaleIntToMinutes(1);
  const timer = { WORK: timeLimit, REST: timeLimit };
  const game = {
    id: null,
    phase: PHASE.WORK,
    state: STATE.STOPPED,
    current: 0,
  };

  document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = ((document.getElementById('time'): any): HTMLElement);
    const restDisplay = ((document.getElementById(
      'rest-counter',
    ): any): HTMLElement);
    const workDisplay = ((document.getElementById(
      'work-counter',
    ): any): HTMLElement);
    const incWorkBtn = ((document.getElementById(
      'work-inc',
    ): any): HTMLButtonElement);
    const decWorkBtn = ((document.getElementById(
      'work-dec',
    ): any): HTMLButtonElement);
    const incRestBtn = ((document.getElementById(
      'rest-inc',
    ): any): HTMLButtonElement);
    const decRestBtn = ((document.getElementById(
      'rest-dec',
    ): any): HTMLButtonElement);
    const resetBtn = ((document.getElementById(
      'reset-btn',
    ): any): HTMLButtonElement);
    const timerBtn = ((document.getElementById(
      'timer-btn',
    ): any): HTMLButtonElement);
    const circleDisplay = ((document.getElementById(
      'timer',
    ): any): HTMLElement);

    const set = setFill(circleDisplay);

    const toggle = toggleHandler(
      timerDisplay,
      circleDisplay,
      timerBtn,
      timer,
      game,
      startTimer,
      stopTimer,
      set,
    );

    const reset = resetHandler(timerDisplay, timerBtn, set, game);
    timerBtn.addEventListener(eventType(), toggle);
    resetBtn.addEventListener(eventType(), reset);

    incWorkBtn.addEventListener(
      eventType(),
      stepperHandler(workDisplay, 'inc', PHASE.WORK, timer),
    );
    decWorkBtn.addEventListener(
      eventType(),
      stepperHandler(workDisplay, 'dec', PHASE.WORK, timer),
    );
    incRestBtn.addEventListener(
      eventType(),
      stepperHandler(restDisplay, 'inc', PHASE.REST, timer),
    );
    decRestBtn.addEventListener(
      eventType(),
      stepperHandler(restDisplay, 'dec', PHASE.REST, timer),
    );
  });
}
