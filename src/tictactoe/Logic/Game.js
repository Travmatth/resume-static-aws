/* @flow */

import {
  move,
  createGrid,
  playerHasWon,
  playerHasWonDiagonal,
  serialize,
} from './Board';
import type { GameGrid, GameState, ScoreCard } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const genScoreCard = (): ScoreCard => ({ X: 0, Y: 0 });

class Game {
  state: GameState;

  constructor() {
    this.state = ({
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
      finished: false,
      turn: Side.X,
      history: [],
      grid: createGrid(),
    });
  }

  isOver() {
    return this.state.finished;
  }

  update(newState: any) {
    this.state = Object.assign({}, this.state, (newState: GameState));
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

  takeTurn(turn: GameGrid) {
    // Only move if player has control of board, this shouldn't be reached
    if (!(this.state.player === this.state.turn)) {
      const msg = "takeTurn shouldn't be executing while player isn't moving";
      console.error(msg);
      return;
    }

    const { grid, history } = this.state;

    const remaining = grid.filter(cell => cell.player === null);

    // if spaces available, store history, make move
    if (remaining.length > 0) {
      const current = grid;

      this.update({
        history: history.push(current),
        grid: move(grid, turn),
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

  simulateFirstMove() {
    this.update({
      turn: Side.X,
    });

    this.simulateMove();
  }

  simulateMove() {
    const { grid, history, turn, finished } = this.state;

    this.update({
      history: history.push(grid),
      input: !this.state.input,
    });

    const empty = grid.filter(cell => cell.player === null).length;

    // don't make move if game board is full
    if (empty <= 1 || finished) {
      this.update({ finished: true });
      return serialize(grid);
    }

    // choose next move
    const next = grid.filter(cell => cell.player === null).slice(0, 1);

    const nextGrid = move(grid, { ...next, player: turn });
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
