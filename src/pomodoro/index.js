/* @flow */
import Pomodoro from './Pomodoro';

if (global.document !== undefined) {
  document.addEventListener('DOMContentLoaded', bindToListeners);
}

let timer: HTMLElement;
let incWorkBtn: HTMLButtonElement;
let decWorkBtn: HTMLButtonElement;
let incRestBtn: HTMLButtonElement;
let decRestBtn: HTMLButtonElement;
let timerBtn: HTMLButtonElement;
let resetBtn: HTMLButtonElement;

export function bindToListeners() {
  const pom = new Pomodoro(1, 1);
  timer = ((document.getElementById('time'): any): HTMLElement);
  incWorkBtn = ((document.getElementById('work-inc'): any): HTMLButtonElement);
  decWorkBtn = ((document.getElementById('work-dec'): any): HTMLButtonElement);
  incRestBtn = ((document.getElementById('rest-inc'): any): HTMLButtonElement);
  decRestBtn = ((document.getElementById('rest-dec'): any): HTMLButtonElement);
  timerBtn = ((document.getElementById('timer-btn'): any): HTMLButtonElement);

  incWorkBtn.addEventListener('click', pom.stepper('inc', 'work'));
  decWorkBtn.addEventListener('click', pom.stepper('dec', 'work'));
  incRestBtn.addEventListener('click', pom.stepper('inc', 'rest'));
  decRestBtn.addEventListener('click', pom.stepper('dec', 'rest'));
  timerBtn.addEventListener('click', pom.toggle(timer));
  resetBtn.addEventListener('click', pom.reset(timer));
}
