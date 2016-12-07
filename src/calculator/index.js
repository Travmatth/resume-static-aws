/* @flow */
import Expression from './expression'
import { Num, Str } from './CalcPrimitives'

/* called when used selects a glyph */
function keyPress(val: Event): void {
  // update the expression object
  const key = val.target.dataset.key 

  switch (key) {
    case '=':
      try {
        expression.compute() ;
        refresh();
      } catch (error) {
        refresh('Error: Please check console for details');
        console.log(error);
      }

      break

    case 'clear':
      expression.clear();
      refresh();

      break

    case 'delete':
      expression.delete();
      refresh();

      break

    default:
      try {
        expression.update(parseFloat(key) ? new Num(key) : Str(key));
      } catch(error) {
        alert(error);
      }

      refresh();
      break
  }
}

const expression = new Expression()

const refresh = (msg: ?string): void => {
  if (outputWindow) 
        outputWindow.textContent = msg ? msg : expression.getStatement();
} 

/* ON DOCUMENT LOAD */
let outputWindow 

document.addEventListener('DOMContentLoaded', () =>  {
  outputWindow = document.querySelector('h2.window')

  document.querySelectorAll('[data-key]').forEach(el => {
    const opts = [keyPress, { passive: true }]
    el.addEventListener('onclick', ...opts)
    el.addEventListener('touchstart', ...opts)
  })
});