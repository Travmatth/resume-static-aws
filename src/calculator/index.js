/* @flow */
import LogicUnit from './LogicUnit'

/* called when used selects a glyph */
function keyPress(val: Event): void {
  const { key } = val.target.dataset; 

  switch (key) {
    case '=':
      refresh(logic.compute())

      break

    case 'clear':
      logic.clear();
      refresh();

      break

    case 'delete':
      logic.delete();
      refresh();

      break

    default:
      logic.update(key);
      refresh();

      break
  }
};

let outputWindow 
const logic = new LogicUnit();

const refresh = (msg: ?string): void => {
  if (outputWindow) 
        outputWindow.textContent = msg ? msg : logic.getExpression();
} 

document.addEventListener('DOMContentLoaded', () =>  {
  outputWindow = document.querySelector('h2.window');

  document.querySelectorAll('[data-key]').forEach(el => {
    const opts = [keyPress, { passive: true }]
    el.addEventListener('onclick', ...opts)
    el.addEventListener('touchstart', ...opts)
  });
});