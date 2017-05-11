/* @flow */
import { Pomodoro } from './Models';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', bindToListeners);
}

let display: HTMLElement;
let incWorkBtn: HTMLButtonElement;
let decWorkBtn: HTMLButtonElement;
let incRestBtn: HTMLButtonElement;
let decRestBtn: HTMLButtonElement;
let timerBtn: HTMLButtonElement;
let resetBtn: HTMLButtonElement;

export function bindToListeners() {
  const pom = new Pomodoro(1, 1);
  display = ((document.getElementById('time'): any): HTMLElement);
  incWorkBtn = ((document.getElementById('work-inc'): any): HTMLButtonElement);
  decWorkBtn = ((document.getElementById('work-dec'): any): HTMLButtonElement);
  incRestBtn = ((document.getElementById('rest-inc'): any): HTMLButtonElement);
  decRestBtn = ((document.getElementById('rest-dec'): any): HTMLButtonElement);
  timerBtn = ((document.getElementById('timer-btn'): any): HTMLButtonElement);

  resetBtn.addEventListener('click', pom.reset(display));
  timerBtn.addEventListener('click', pom.toggle(display));
  incWorkBtn.addEventListener('click', pom.stepper('inc', 'work'));
  decWorkBtn.addEventListener('click', pom.stepper('dec', 'work'));
  incRestBtn.addEventListener('click', pom.stepper('inc', 'rest'));
  decRestBtn.addEventListener('click', pom.stepper('dec', 'rest'));
}
