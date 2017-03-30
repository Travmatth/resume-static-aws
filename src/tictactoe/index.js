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

  // handle the click events on buttons w/in views
  const startHandler = startGameHandler(game, update(game));
  const playerHandler = playerAction(game, update(game), endTransition);
  const rollback = rollbackHandler(game, update(game));

  // populate fragments with needed elements
  const startViewFragment = createStartView(
    start,
    startHandler,
    chooseTurnHandler,
    game,
    startTransition,
  );
  const playViewFragment = createPlayView(play, playerHandler, rollback, game);
  // const scoreViewFragment = createScoreView(score, restartGameHandler, resetGameHandler, , game, ,)

  // Start scenes by binding the first view to the root container
  render(root, startViewFragment)();
}

// Whenever the game object's state changes we should update the DOM
export const update = (squares: Array<?HTMLButtonElement>) =>
  (latest: Array<string>) => {
    for (let i in Array(9).keys()) {
      const square = squares[i];
      if (square) square.textContent = latest[i];
    }
  };

export const render = (root: HTMLElement, fragment: DocumentFragment) =>
  () => {
    // Responsible for clearing root and replacing views
  };
