/* @flow */
export const Side = { X: 'X', O: 'O' };
export type ScoreCard = {| X: number, O: number |};
export type WinningBoard = Array<Array<boolean>>;
export type Update = (grid: Array<string>) => void;
export type Handler = (e: Event) => void;

export type GameGrid = {|
  x: number,
  y: number,
  player: ?$Keys<typeof Side>,
|};

export type GameBoard = Array<GameGrid>;

export type Coordinates = {
  x: string,
  y: string,
};

export class HTMLGameSquare extends HTMLButtonElement {
  dataset: Coordinates;
}

export type GameState = {
  input: boolean,
  history: Array<GameBoard>,
  turn: $Keys<typeof Side>,
  player: $Keys<typeof Side>,
  finished: boolean,
  grid: Array<GameGrid>,
  score: ScoreCard,
};
