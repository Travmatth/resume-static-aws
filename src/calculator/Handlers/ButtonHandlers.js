/* @flow */
import { Calculator } from '../Models';

const calculator = new Calculator();

/* refreshHandler responsible for updating output window with given text
 */
const refreshHandler = (output: HTMLElement) => (msg: ?string) =>
  output.textContent = msg || calculator.getExpression();

/* dismissPopupHandler responsible toggling off .is-active on modal element
 */
const dismissPopupHandler = (element: HTMLElement) => (_: Event) =>
  element.classList.toggle('is-active', false);

/* displayPopup responsible toggling on .is-active and adding message to modal
 */
const displayPopup = (message: string) => {
  document.querySelector('#error-modal').textContent = message;
  document.querySelector('.modal').classList.toggle('is-active', true);
};

/* keyPressHandler responsible for calculator keypress and calling model
 */
const keyPressHandler = (outputWindow: HTMLElement) => (ev: Event): void => {
  const { key } = ev.target.dataset;
  const refresh = refreshHandler(outputWindow);

  switch (key) {
    case '=':
      try {
        const message = calculator.compute();
        refresh(message);
      } catch (thrown) {
        console.error(thrown);
        displayPopup(thrown.message);
      }

      break;

    case 'clear':
      calculator.clear();
      refresh();

      break;

    case 'delete':
      calculator.delete();
      refresh();

      break;

    default:
      calculator.update(key);
      refresh();

      break;
  }
};

export { refreshHandler, keyPressHandler, displayPopup, dismissPopupHandler };
