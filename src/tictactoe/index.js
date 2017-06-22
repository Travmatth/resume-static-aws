/* @flow */

import {
  render,
  update,
  createStartView,
  createPlayView,
  createScoreView,
} from './Views';

import { Game } from './Models';

import {
  //Starting View
  startGameHandler,
  chooseTurnHandler,
  //Game View
  playerAction,
  rollbackHandler,
  //Score View
  resetGameHandler,
  restartGameHandler,
} from './Handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const { createDocumentFragment } = document;

    // responsible for holding the view currently being shown
    const root = ((document.getElementById('root'): any): HTMLElement);
    // document fragments contain the elements assoc. w/ each view
    const start = document.createDocumentFragment();
    const play = document.createDocumentFragment();
    const score = document.createDocumentFragment();

    // trigger transition btw views
    const resetTransition = render(root, score, start);
    const startTransition = render(root, start, play);
    const endTransition = render(root, play, score);

    // Starting View Handlers
    const startHandler = startGameHandler(game, update(play), startTransition);
    const chooseHandler = chooseTurnHandler(game);
    // Game View Handlers
    const playerHandler = playerAction(game, update(play), endTransition);
    const rollback = rollbackHandler(game, update(play));
    // Score View Handlers
    const resetHandler = resetGameHandler(game, resetTransition);
    const restartHandler = restartGameHandler(game, update(play));

    // populate fragments with needed elements
    const startViewFragment = createStartView(
      start,
      startHandler,
      chooseHandler,
    );
    const playViewFragment = createPlayView(play, playerHandler, rollback);
    const scoreViewFragment = createScoreView(
      score,
      restartHandler,
      resetHandler,
      resetTransition,
      game,
    );

    // Start scenes by binding the first view to the root container
    render(root, null, startViewFragment)();
  });
}
