/* @flow */

import { game, ROW_LENGTH } from './Models';
import { Side, scenes } from './tictactoe.types';
import { eventType } from 'common/js/Utils';
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
  toggleDifficultyDropdown,
  setDifficultyHandler,
} from './Handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.game = game;
    const type = eventType();
    let gameTile: HTMLElement;
    const gameTiles = document.querySelectorAll('.game-tile');
    const refresh = update(document.querySelectorAll('.tile'));

    // Start View Setup
    const difficulty = document.getElementById('difficulty');
    const toggleDifficulty = toggleDifficultyDropdown(difficulty);
    const turnHandler = chooseTurnHandler(game, refresh, showScene);

    difficulty.addEventListener(type, toggleDifficulty);

    document.querySelectorAll('.difficulty').forEach((el, i) => {
      if (!el.dataset) el.dataset = {};
      el.dataset.difficulty = `${i + 1}`;
      el.addEventListener(type, setDifficultyHandler(game, difficulty));
      el.addEventListener(type, toggleDifficulty);
    });

    document.querySelectorAll('.select-btn').forEach(el => {
      if (!el.dataset) el.dataset = {};
      el.dataset.glyph = el.textContent.includes('X') ? Side.X : Side.O;
      el.addEventListener(type, turnHandler);
    });

    // Play View Setup
    for (let x of Array(3).keys()) {
      for (let y of Array(3).keys()) {
        gameTile = gameTiles.item(x * ROW_LENGTH + y);
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
