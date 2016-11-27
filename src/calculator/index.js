/* @flow */
document.addEventListener('DOMContentLoaded', () =>  {
  document.querySelectorAll('[data-key]').forEach(el => {
    el.addEventListener('onclick', keyPress)
    el.addEventListener('touchstart', keyPress)
  })
});

function keyPress(val: Event): void {
  console.log(val.target.dataset.key);
}
