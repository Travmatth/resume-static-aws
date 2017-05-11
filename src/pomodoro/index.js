/* @flow */
import { Pomodoro } from './Models';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', bindToListeners);
  () => {
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
    const timerBtn = ((document.getElementById(
      'timer-btn',
    ): any): HTMLButtonElement);

    resetBtn.addEventListener('click', pom.reset(display));
    timerBtn.addEventListener('click', pom.toggle(display));
    incWorkBtn.addEventListener('click', pom.stepper('inc', 'work'));
    decWorkBtn.addEventListener('click', pom.stepper('dec', 'work'));
    incRestBtn.addEventListener('click', pom.stepper('inc', 'rest'));
    decRestBtn.addEventListener('click', pom.stepper('dec', 'rest'));
  };
}
