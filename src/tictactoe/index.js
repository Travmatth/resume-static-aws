/* @flow */

import { Game } from './Models';
import { Side, scenes } from './tictactoe.types';
import { eventType } from 'common/js/utils';
import {
  // Helpers
  showScene,
  update,
  // Starting View
  chooseTurnHandler,
  // Game View
  playerAction,
  rollbackHandler,
  // Score View
  resetGameHandler,
  restartGameHandler,
  updateScoreEvent,
  updateScoreListener,
} from './Handlers';
import { registerToggle } from 'common/js/handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    registerToggle();

    const game = new Game();
    const type = eventType();
    const rowLength = 3;

    let gameTile: HTMLElement;
    const gameTiles = document.querySelectorAll('.game-tile');
    const refresh = update(document.querySelectorAll('.tile'));

    // Start View Setup
    document.querySelectorAll('.select-btn').forEach(el => {
      if (!el.dataset) el.dataset = {};
      el.dataset.glyph = el.textContent.includes('X') ? Side.X : Side.O;
      el.addEventListener('click', chooseTurnHandler(game, refresh, showScene));
    });

    // Play View Setup
    for (let x of Array(3).keys()) {
      for (let y of Array(3).keys()) {
        gameTile = gameTiles.item(x * rowLength + y);
        if (!gameTile.dataset) gameTile.dataset = {};

        gameTile.dataset.x = `${x}`;
        gameTile.dataset.y = `${y}`;

        const action = playerAction(game, refresh, showScene);
        gameTile.addEventListener(type, action);
      }
    }

    document
      .querySelector('#undo')
      .addEventListener(type, rollbackHandler(game, refresh));

    // Score View Setup
    document
      .querySelector('#restart')
      .addEventListener(type, restartGameHandler(game, refresh, showScene));
    document
      .querySelector('#reset')
      .addEventListener(type, resetGameHandler(game, showScene));

    document
      .querySelector('#X-score')
      .addEventListener(updateScoreEvent, updateScoreListener);

    document
      .querySelector('#O-score')
      .addEventListener(updateScoreEvent, updateScoreListener);

    // Start scenes by making first visible
    showScene(scenes.start);
  });
}
