/* @flow */
import Expression from './expression'

/* called when used selects a glyph */
function keyPress(val: Event): void {
  // update the expression object
  const key = val.target.dataset.key 
  const outputWindow = document.querySelector('div.window')
  switch (key) {
    case '=':
      try {
        expression.compute() 
        if (outputWindow) 
          outputWindow.textContent = expression.getStatement()
      } catch (error) {
        console.log(error)
      }
      break

    case 'clear':
      expression.clear()
      if (outputWindow) 
        outputWindow.textContent = expression.getStatement()
      break

    case 'delete':
      expression.delete()
      if (outputWindow) 
        outputWindow.textContent = expression.getStatement()
      break

    default:
      try {
        const parsedKey = parseInt(key) ? parseInt(key) : key
        expression.update(parsedKey) 
        if (outputWindow) 
          outputWindow.textContent = expression.getStatement();
      } catch(error) {
        alert(error)
      }
      break
  }
}

/* ON DOCUMENT LOAD */
const expression = new Expression()

document.addEventListener('DOMContentLoaded', () =>  {
  document.querySelectorAll('[data-key]').forEach(el => {
    el.addEventListener('onclick', keyPress, { passive: true })
    el.addEventListener('touchstart', keyPress, { passive: true })
  })
});