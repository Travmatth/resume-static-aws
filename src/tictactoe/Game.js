import {
  move,
  clone,
  createGrid,
  playerHasWon,
  playerHasWonDiagonal,
  serialize,
} from './Grid';
import type { Player, GameGrid } from './tictactoe.types';

export const Player = { X: 'X', O: 'O' };
export const genScoreCard = (): ScoreCard => ({ X: 0, Y: 0 });

export default class Game {
  state: GameState;

  constructor() {
    this.state = ({
      history: [],
      turn: Player.X,
      delay: 100,
      player: Player.X,
      newGame: true,
      finished: false,
      grid: createGrid(),
      score: genScoreCard(),
    }: GameState);
  }

  // restart the game grid
  restart(grid) {
    this.update({
      player: 'X',
      delay: 100,
      newGame: true,
      finished: false,
    });

    this.reset();
    return serialize(this.state.grid);
  }

  // resets the game grid
  reset() {
    this.update({
      history: [],
      turn: Player.X,
      finished: false,
      grid: createGrid(),
    });

    return serialize(this.state.grid);
  }

  update(newState) {
    this.state = Object.assign({}, this.state, newState);
  }

  // MARK_WINNER update scorecard
  markWinner(winner) {
    this.state.score[winner] += 1;
  }

  // GLYPH_CHOSEN choose player (X or O)
  chooseSide(desiredSide: $Keys<Player>) {
    this.update({
      player: desiredSide,
      newGame: false,
    });
  }

  // ROLL_BACK return game to last state, stopping at original
  rollback(grid): Array<Grid> {
    const { history } = this.state;
    if (history.length > 0) {
      this.update({
        history: history.slice(0, -1),
        grid: history.pop(),
      });
    }

    return serialize(this.state.grid);
  }

  // TAKE_TURN update game board, return current state
  takeTurn(turn) {
    // Only move if player has control of board
    if (!(this.state.player === this.state.turn)) return;

    const { turn } = action.payload;

    const empty = this.state.grid.filter(cell => cell.player === null);

    // if spaces available, store history, make move
    if (empty.length > 0) {
      const current = this.state.grid;

      this.update({
        history: this.state.history.push(clone(current)),
        grid: move(this.state.grid, turn),
      });

      // check winning status
      // update score
      let hasWon = false;

      if (playerHasWon(turn.player, this.state.grid)) {
        hasWon = true;
        this.state.score[turn.player] += 1;
      }

      // set rest of state
      this.update({
        input: !this.state.input,
        turn: turn === 'X' ? 'O' : 'X',
        finished: emptySquares.size <= 1 || hasWon,
      });

      //Finished turn at this point
      return;
    }

    this.update({
      newGame: false,
    });

    return serialize(this.state.grid);
  }

  simulateFirstMove() {
    this.update({
      input: false,
      turn: 'X',
    });

    this.simulateMove();
  }

  simulateMove() {
    const { grid, history, turn, finished } = this.state;

    this.update({
      newGame: false,
      history: history.push(clone(grid)),
      input: !this.state.input,
    });

    const empty = clone(grid).filter(cell => cell.player === null).length;

    // don't make move if game board is full
    if (empty <= 1 || finished) {
      this.update({ finished: true });
      return serialize(grid);
    }

    // choose next move
    const next = clone(grid).filter(cell => cell.player === null).slice(0, 1);
    const nextGrid = move(grid, { ...next, player: turn });
    this.update({ grid: nextGrid });

    let hasWon = false;
    if (playerHasWon(turn, this.state.grid)) {
      hasWon = true;
      this.state.score[turn] += score + 1;
    }

    // set rest of state
    this.update({
      turn: turn === Player.X ? Player.O : Player.X,
      finished: empty <= 1 || hasWon,
    });

    return serialize(this.state.grid);
  }
}
