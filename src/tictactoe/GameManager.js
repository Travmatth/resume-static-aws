const makeAction = (data: Data): Action => {};

export const playerAction = (
  game: Game,
  square: mixed,
  updateBoard,
): ?Board => {
  if (!game.canMove()) return;
  const delay = 500; //ms

  setTimeout(
    () => {
      const postPlayer = game.playerAction(makeAction(square));
      updateBoard(postPlayer);

      setTimeout(
        () => {
          const postComputer = game.computerAction();
          updateBoard(postComputer);
        },
        delay * 2,
      );
    },
    delay * 1,
  );
};

export const extractGlyph = (elem: HTMLElement): string => {
  return elem.textContent;
};

// resetGame is responsible for resetting the game
// if the player is first turn, should only reset game
// if player is second turn, should reset grid and perform first move
export const resetGameHandler = (game: Game, updateBoard): ?Board =>
  (e: Event) => {
    const glyph = extractGlyph(e.target);
    const postReset = game.resetGrid();
    updateBoard(postReset);
    if (glyph === Player.O) {
      const postMove = simulateFirstMove(game);
      updateBoard(postMove);
    }
  };

export const restartGameHandler = (game: Game) =>
  (e: Event) => {
    const glyph = extractGlyph(e.target);
    const postReset = game.restartGrid();
    updateBoard(postReset);
    if (glyph === Player.O) {
      const postMove = simulateFirstMove(game);
      updateBoard(postMove);
    }
  };

// if the player is currently is first turn
//  should only reset game
// if player is second turn
//  should reset grid and perform first move
export const startGameHandler = (game, updateBoard) =>
  e => {
    if (this.state.player === Player.O) {
      setTimeout(
        () => {
          const grid = game.simulateFirstMove();
          updateBoard(grid);
        },
        delay,
      );
    }
  };

export const rollbackHandler = (game: Game, callback: () => void) =>
  (e: Event) => {
    const previous = game.rollback();
    callback(rollback /*, game */);
  };

export const choseTurnHandler = (game: Game, desired: $Keys<Player>) =>
  (e: Event) => {
    const previous = game.chooseSide(desired);
  };
