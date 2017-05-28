/* @flow */
// Whenever the game object's state changes we should update the DOM
const update = (squares: DocumentFragment) => (latest: Array<string>) => {
  for (var i = 0; i < 9; i++) {
    const square = squares.children[i];
    if (square) square.textContent = latest[i];
  }
};

// Responsible for replacing views on the root container
const render = (
  root: HTMLElement,
  previous: ?DocumentFragment,
  current: DocumentFragment,
) => () => {
  if (root.hasChildNodes() && previous) {
    root.removeChild(previous);
  }

  root.appendChild(current);
};

export { render, update };
