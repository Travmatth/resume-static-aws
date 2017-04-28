/* @flow */
'use strict';

import type { Handler } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

// The start menu allows the player to choose between the X or O glyph
const createStartView = (
  fragment: DocumentFragment,
  start: Handler,
  choose: Handler,
) => {
  // Pressed in the start screen, should select a side for the player
  const x = sideSelectionButton(Side.X, choose, start);
  const o = sideSelectionButton(Side.O, choose, start);
  // Pressed in the start screen, should start the game by switching views
  const button = startButton(start);

  fragment.appendChild(x);
  fragment.appendChild(o);
  fragment.appendChild(button);

  return fragment;
};

const startButton = (handler: Handler) => {
  const start = document.createElement('button');

  start.textContent = 'start';
  start.addEventListener('click', handler);

  return start;
};

const sideSelectionButton = (
  glyph: $Keys<typeof Side>,
  choose: Handler,
  start: Handler,
) => {
  const select = document.createElement('button');

  start.textContent = glyph;
  start.dataset.glyph = glyph;
  start.addEventListener('click', choose);

  return select;
};

export { startButton, sideSelectionButton, createStartView };
