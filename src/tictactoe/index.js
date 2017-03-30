/* @flow */
import { createStartView, createPlayView, createScoreView } from './Views';

import {
  Game,
  //Starting View
  startGameHandler,
  chooseTurnHandler,
  //Game View
  playerAction,
  rollbackHandler,
  //Score View
  resetGameHandler,
  restartGameHandler,
} from './Logic';

if (global.document !== undefined) {
  const game = new Game();
  const { createDocumentFragment } = document;

  // responsible for holding the view currently being shown
  const root = document.getElementById('root');

  // document fragments contain the elements assoc. w/ each view
  const start = document.createDocumentFragment();
  const play = document.createDocumentFragment();
  const score = document.createDocumentFragment();

  // trigger transition btw views
  const resetTransition = render(root, start);
  const startTransition = render(root, game);
  const endTransition = render(root, score);

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
  const startViewFragment = createStartView(start, startHandler, chooseHandler);
  const playViewFragment = createPlayView(play, playerHandler, rollback);
  const scoreViewFragment = createScoreView(
    score,
    restartHandler,
    resetHandler,
    resetTransition,
    game,
  );

  // Start scenes by binding the first view to the root container
  render(root, startViewFragment)();
}

// Whenever the game object's state changes we should update the DOM
export const update = (squares: DocumentFragment) =>
  (latest: Array<string>) => {
    for (let i in Array(9).keys()) {
      const square = squares.childNodes[i];
      if (square) square.textContent = latest[i];
    }
  };

export const render = (root: HTMLElement, fragment: DocumentFragment) =>
  () => {
    // Responsible for replacing views on the root container
  };
