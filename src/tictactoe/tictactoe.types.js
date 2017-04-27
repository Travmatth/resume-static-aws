/* @flow */
'use strict';
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

export type Coordinates = {
  x: string,
  y: string,
};

declare class HTMLGameSquare extends HTMLButtonElement {
  dataset: Coordinates,
}

export type GameState = {|
  history: Array<GameGrid>,
  turn: $Keys<typeof Side>,
  player: ?$Keys<typeof Side>,
  finished: boolean,
  grid: Array<Grid>,
  score: ScoreCard,
|};
