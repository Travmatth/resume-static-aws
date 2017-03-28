import Player from './Game';

export type ScoreCard = {| X: number, O: number |};
export type GameGrid = {| x: number, y: number, player: ?$Keys<Player> |};

export type GameState = {
  history: Array<GameGrid>,
  turn: $Keys<Player>,
  player: ?$Keys<Player>,
  delay: number,
  input: boolean,
  newGame: boolean,
  finished: boolean,
  grid: Array<Grid>,
  score: ScoreCard,
};
