/* @flow */
import Expression from './expression'

/* called when used selects a glyph */
function keyPress(val: Event): void {
  // update the expression object
  const key = val.target.dataset.key 

  switch (key) {
    case '=':
      try {
        expression.compute() 
        print()
      } catch (error) {
        print('Error: Please check console for details')
        console.log(error)
      }

      break

    case 'clear':
      expression.clear()
      print()

      break

    case 'delete':
      expression.delete()
      print()

      break

    default:
      try {
        expression.update(parseFloat(key) ? parseFloat(key) : key) 
      } catch(error) {
        alert(error)
      }
      print()

      break
  }
}

/* ON DOCUMENT LOAD */
let outputWindow 
const expression = new Expression()

const print = (msg: ?string): void => {
  if (outputWindow) 
        outputWindow.textContent = msg ? msg : expression.getStatement();
} 

document.addEventListener('DOMContentLoaded', () =>  {
  outputWindow = document.querySelector('div.window')

  document.querySelectorAll('[data-key]').forEach(el => {
    const opts = [keyPress, { passive: true }]
    el.addEventListener('onclick', ...opts)
    el.addEventListener('touchstart', ...opts)
  })
});