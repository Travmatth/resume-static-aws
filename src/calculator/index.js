/* @flow */
import LogicUnit from './LogicUnit'

let outputWindow 
const logic = new LogicUnit();

document.addEventListener('DOMContentLoaded', () =>  {
  outputWindow = document.querySelector('h2.window');

  document.querySelectorAll('[data-key]').forEach(el => {
    el.addEventListener('click', keyPress)
    el.addEventListener('touchstart', keyPress, { passive: true })
  });
});

const refresh = (msg: ?string): void => {
  if (outputWindow) 
        outputWindow.textContent = msg ? msg : logic.getExpression();
} 

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
