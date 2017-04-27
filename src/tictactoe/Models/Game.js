/* @flow */

import {
  makeHistory,
  move,
  createGrid,
  playerHasWon,
  playerHasWonDiagonal,
  serialize,
} from './Board';
import type {
  GameBoard,
  GameGrid,
  GameState,
  ScoreCard,
} from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const genScoreCard = (): ScoreCard => ({ X: 0, O: 0 });

class Game {
  state: GameState;

  constructor() {
    this.state = ({
      input: false,
      history: [],
      turn: Side.X,
      player: Side.X,
      finished: false,
      grid: createGrid(),
      score: genScoreCard(),
    }: GameState);
  }

  getScore(glyph: $Keys<typeof Side>) {
    return this.state.score[glyph];
  }

  canMove() {
    const { player, turn } = this.state;
    return player === turn;
  }

  player() {
    return this.state.player;
  }

  restart() {
    this.update({
      input: true,
      finished: false,
      turn: Side.X,
      history: [],
      grid: createGrid(),
    });
  }

  isOver() {
    return this.state.finished;
  }

  update(newState: $Shape<GameState>) {
    this.state = Object.assign(this.state, newState);
  }

  markWinner(winner: $Keys<typeof Side>) {
    this.state.score[winner] += 1;
  }

  chooseSide(desiredSide: $Keys<typeof Side>) {
    this.update({
      player: desiredSide,
    });
  }

  rollback() {
    const { history } = this.state;
    if (history.length > 0) {
      this.update({
        history: history.slice(0, -1),
        grid: history.pop(),
      });
    }
  }

  takeTurn(selected: GameGrid) {
    // Only move if player has control of board, this shouldn't be reached
    if (!(this.state.player === this.state.turn)) {
      const msg = "takeTurn shouldn't be executing while player isn't moving";
      console.error(msg);
      return;
    }

    const { grid, history, turn } = this.state;

    const remaining = grid.filter(cell => cell.player === null);

    // if spaces available, store history, make move
    if (remaining.length > 0) {
      this.update({
        history: makeHistory(grid, history),
        grid: move(grid, selected),
      });

      // check winning status, update score
      let hasWon = false;
      if (playerHasWon(turn, grid)) {
        hasWon = true;
        this.state.score[turn] += 1;
      }

      // set rest of state
      this.update({
        turn: turn === 'X' ? 'O' : 'X',
        finished: remaining.length <= 1 || hasWon,
      });

      //Finished turn at this point
      return;
    }
  }

  startPlayerMove() {
    this.update({ input: true });
  }

  endPlayerMove() {
    this.update({ input: false });
  }

  simulateFirstMove() {
    this.update({
      turn: Side.X,
      input: false,
    });

    this.simulateMove();
  }

  simulateMove() {
    const { grid, history, turn, finished } = this.state;

    this.update({
      history: makeHistory(grid, history),
      input: !this.state.input,
    });

    const empty = grid.filter(cell => cell.player === null).length;

    // don't make move if game board is full
    if (empty <= 1 || finished) {
      this.update({ finished: true });
      return serialize(grid);
    }

    // choose next move
    const next = grid.filter(cell => cell.player === null)[0];
    const { player: _, ...coords } = next;

    const nextGrid = move(grid, { coords, player: turn });
    this.update({ grid: nextGrid });

    // Check if computer has won
    let hasWon = false;
    if (playerHasWon(turn, grid)) {
      hasWon = true;
      this.state.score[turn] += 1;
    }

    // set rest of state
    this.update({
      turn: turn === Side.X ? Side.O : Side.X,
      finished: empty <= 1 || hasWon,
    });
  }

  current() {
    return serialize(this.state.grid);
  }
}

export { genScoreCard, Game };
