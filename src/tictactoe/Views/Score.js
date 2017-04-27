/* @flow */
'use strict';
import type { Handler } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const createScoreView = (
  fragment: DocumentFragment,
  restart: Handler,
  reset: Handler,
  transition: () => void,
  game: Game,
) => {
  const oScore = scoreElement(game, Side.O);
  const xScore = scoreElement(game, Side.X);
  const restart = lifecycleButton('restart', restart);
  const reset = lifecycleButton('reset', reset);

  fragment.appendChild(oScore);
  fragment.appendChild(xScore);
  fragment.appendChild(restart);
  fragment.appendChild(reset);

  return fragment;
};

const scoreElement = (game: Game, glyph: $Keys<typeof Side>) => {
  const elem = document.createElement('div');

  elem.textContent = game.getScore(glyph);

  return elem;
};

const lifecycleButton = (text: string, trigger: Handler) => {
  const button = document.createElement('button');

  button.textContent = text;
  button.addEventListener('click', trigger);

  return button;
};

export { createScoreView, scoreElement, lifecycleButton };
