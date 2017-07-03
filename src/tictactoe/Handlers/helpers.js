/* @flow */

import { scenes } from '../tictactoe.types';

// Whenever the game object's state changes we should update the DOM
const update = (squares: NodeList<HTMLElement>) => (latest: Array<string>) =>
  squares.forEach(
    (square: HTMLElement, i: number) => square.textContent = latest[i],
  );

// Responsible for replacing views on the root container
const showScene = (next: $Keys<typeof scenes>) => {
  console.trace();
  document
    .querySelectorAll('.scene')
    .forEach(
      (el: HTMLElement) =>
        ((el.id: any) === next
          ? el.classList.toggle('hidden', false)
          : el.classList.toggle('hidden', true)),
    );
};

export { showScene, update };
