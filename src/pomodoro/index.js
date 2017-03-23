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
  timer = (document.getElementById('time'): HTMLElement);
  incWorkBtn = (document.getElementById('work-inc'): HTMLButtonElement);
  decWorkBtn = (document.getElementById('work-dec'): HTMLButtonElement);
  incRestBtn = (document.getElementById('rest-inc'): HTMLButtonElement);
  decRestBtn = (document.getElementById('rest-dec'): HTMLButtonElement);
  timerBtn = (document.getElementById('timer-button'): HTMLButtonElement);

  incWorkBtn.addEventListener('onclick', pom.stepper('inc', 'work'));
  decWorkBtn.addEventListener('onclick', pom.stepper('dec', 'work'));
  incRestBtn.addEventListener('onclick', pom.stepper('inc', 'rest'));
  decRestBtn.addEventListener('onclick', pom.stepper('dec', 'rest'));
  timerBtn.addEventListener('onclick', pom.toggle(timer));
  resetBtn.addEventListener('onclick', pom.reset(timer));
}
