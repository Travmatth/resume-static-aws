/* @flow */
import { Pomodoro } from './Models';
import { eventType } from 'common/js/utils';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const pom = new Pomodoro(1, 1);
    const display = ((document.getElementById('time'): any): HTMLElement);
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

    resetBtn.addEventListener(eventType(), pom.reset(display));
    timerBtn.addEventListener(eventType(), pom.toggle(display));
    incWorkBtn.addEventListener(eventType(), pom.stepper('inc', 'work'));
    decWorkBtn.addEventListener(eventType(), pom.stepper('dec', 'work'));
    incRestBtn.addEventListener(eventType(), pom.stepper('inc', 'rest'));
    decRestBtn.addEventListener(eventType(), pom.stepper('dec', 'rest'));
  });
}
