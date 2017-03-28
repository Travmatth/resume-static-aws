/* @flow */

import {
  move,
  copy,
  createGrid,
  playerHasWon,
  playerHasWonDiagonal,
  serialize,
} from './GameBoard';
import type { GameGrid, GameState, ScoreCard } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

export const genScoreCard = (): ScoreCard => ({ X: 0, Y: 0 });

export default class Game {
  state: GameState;

  constructor() {
    this.state = ({
      history: [],
      turn: Side.X,
      delay: 100,
      player: Side.X,
      newGame: true,
      finished: false,
      grid: createGrid(),
      score: genScoreCard(),
    }: GameState);
  }

  canMove(): boolean {
    const { player, turn } = this.state;
    return player === turn;
  }

  player() {
    return this.state.player;
  }

  // restart the game grid
  restart(grid: Array<GameGrid>) {
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
      turn: Side.X,
      finished: false,
      grid: createGrid(),
    });

    return serialize(this.state.grid);
  }

  update(newState: any) {
    this.state = Object.assign({}, this.state, (newState: GameState));
  }

  // MARK_WINNER update scorecard
  markWinner(winner: $Keys<typeof Player>) {
    this.state.score[winner] += 1;
  }

  // GLYPH_CHOSEN choose player (X or O)
  chooseSide(desiredSide: $Keys<typeof Player>) {
    this.update({
      player: desiredSide,
      newGame: false,
    });
  }

  // ROLL_BACK return game to last state, stopping at original
  rollback(grid: Array<GameGrid>) {
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
  takeTurn(turn: GameGrid) {
    // Only move if player has control of board
    if (!(this.state.player === this.state.turn)) return;

    const remaining = this.state.grid.filter(cell => cell.player === null);

    // if spaces available, store history, make move
    if (remaining.length > 0) {
      const current = this.state.grid;

      this.update({
        history: this.state.history.push(copy(current)),
        grid: move(this.state.grid, turn),
      });

      // check winning status
      // update score
      let hasWon = false;

      if (playerHasWon(turn, this.state.grid)) {
        hasWon = true;
        this.state.score[turn] += 1;
      }

      // set rest of state
      this.update({
        input: !this.state.input,
        turn: turn === 'X' ? 'O' : 'X',
        finished: remaining.length <= 1 || hasWon,
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
      history: history.push(copy(grid)),
      input: !this.state.input,
    });

    const empty = copy(grid).filter(cell => cell.player === null).length;

    // don't make move if game board is full
    if (empty <= 1 || finished) {
      this.update({ finished: true });
      return serialize(grid);
    }

    // choose next move
    const next = copy(grid).filter(cell => cell.player === null).slice(0, 1);

    const nextGrid = move(grid, { ...next, player: turn });
    this.update({ grid: nextGrid });

    let hasWon = false;
    if (playerHasWon(turn, this.state.grid)) {
      hasWon = true;
      this.state.score[turn] += 1;
    }

    // set rest of state
    this.update({
      turn: turn === Side.X ? Side.O : Side.X,
      finished: empty <= 1 || hasWon,
    });

    return serialize(this.state.grid);
  }
}
