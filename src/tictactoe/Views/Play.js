/* @flow */
import type { Handler } from '../tictactoe.types';

const createPlayView = (
  fragment: DocumentFragment,
  move: Handler,
  undo: Handler,
) => {
  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      fragment.appendChild(gameTile(x, y, move));
    }
  }

  fragment.appendChild(undoButton(undo));
  return fragment;
};

const gameTile = (x: number, y: number, move: Handler) => {
  const tile = document.createElement('button');

  tile.dataset.x = `${x}`;
  tile.dataset.y = `${y}`;
  tile.addEvenListener('click', move);

  return tile;
};

const undoButton = (undo: Handler) => {
  const button = document.createElement('button');

  button.textContent = 'Undo Move';
  button.addEvenListener(click, undo);

  return tile;
};

export { createPlayView, gameTile, undoButton };
