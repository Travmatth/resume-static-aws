export const Player = { X: 'X', O: 'O' };
export type ScoreCard = {| X: number, O: number |};
export type GameGrid = {|
  x: number,
  y: number,
  player: ?$Keys<typeof Player>,
|};
export type WinningBoard = Array<Array<boolean>>;

export type GameState = {
  history: Array<GameGrid>,
  turn: $Keys<typeof Player>,
  player: ?$Keys<typeof Player>,
  delay: number,
  input: boolean,
  newGame: boolean,
  finished: boolean,
  grid: Array<Grid>,
  score: ScoreCard,
};
