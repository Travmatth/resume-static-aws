/* @flow */
import type { Handler } from '../tictactoe.types';
import { Side } from '../tictactoe.types';
import type { Game } from '../Models';

const createScoreView = (
  fragment: DocumentFragment,
  restart: Handler,
  reset: Handler,
  transition: () => void,
  game: Game,
) => {
  const oScore = scoreElement(game, Side.O);
  const xScore = scoreElement(game, Side.X);
  const restartButton = lifecycleButton('restart', restart);
  const resetButton = lifecycleButton('reset', reset);

  fragment.appendChild(oScore);
  fragment.appendChild(xScore);
  fragment.appendChild(restartButton);
  fragment.appendChild(resetButton);

  return fragment;
};

const scoreElement = (game: Game, glyph: $Keys<typeof Side>) => {
  const elem = document.createElement('div');

  elem.textContent = `${game.getScore(glyph)}`;

  return elem;
};

const lifecycleButton = (text: string, trigger: Handler) => {
  const button = document.createElement('button');

  button.textContent = text;
  button.addEventListener('click', trigger);

  return button;
};

export { createScoreView, scoreElement, lifecycleButton };
