/* @flow */
import type { Calculator } from '../Models';

const refreshHandler = (calculator: Calculator, output: HTMLElement) => (
  msg: ?string,
) => output.textContent = msg || calculator.getExpression();

const dismissPopupHandler = (element: HTMLElement) => () =>
  element.classList.toggle('is-active', false);

const displayPopup = (modal: HTMLElement, error: HTMLElement) => (
  message: string,
) => {
  modal.classList.toggle('is-active', true);
  error.textContent = message;
};

const keyPressHandler = (
  calculator: Calculator,
  refresh: ?string => void,
  display: string => void,
) => (ev: Event): void => {
  const { key } = ev.target.dataset;

  switch (key) {
    case '=':
      try {
        refresh(calculator.compute());
      } catch (thrown) {
        console.error(thrown);
        display(thrown.message);
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
