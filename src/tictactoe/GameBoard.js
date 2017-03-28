/**
 * createGrid creates an array of cell objects
 * @return {[Cell]} List of cell Maps; {x, y, player}
 */
export function createGrid() {
  const grid = [];

  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      grid.push({ x, y, player: null });
    }
  }

  return grid;
}

export const copy = (obj: Object): Object => JSON.parse(JSON.stringify(obj));

export function move(grid, { x, y, player }) {
  const square = x * 3 + y;
  const clone = copy(grid);

  if (clone[square].player === null) {
    clone[square].player = player;
  }

  return clone;
}

export const serialize = grid => clone(grid).map(cell => cell.player);

export function hasColumnScore(grid, score) {}

export function hasDiagonalScore(grid, score) {}

export function optimalMove() {}
/**
 * playerHasWonRow will check the given grid and return true if any
 * horizontal Row is a win for the given player
 * @param  {string} player [the player to check for horizontal wins]
 * @param  {grid}   grid   [grid in question]
 * @return {bool}          [whether player has a winning Row]
 */
export function playerHasWonRow(player, grid) {
  let hasWon = false;
  const clone = copy(grid);

  for (let row of Array(3).keys()) {
    clone
      .filter(cell => cell.player === player && cell.x === row)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
}

/**
 * playerHasWonColumn will check the given grid and return true if any
 * horizontal column is a win for the given player
 * @param  {string} player [the player to check for horizontal wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has a winning column]
 */
export function playerHasWonColumn(player, grid) {
  let hasWon = false;
  const clone = copy(grid);

  for (let col of Array(3).keys()) {
    clone
      .filter(cell => cell.player === player && cell.y === col)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
}

/**
 * [playerHasWonDiagonal checks the board for winning combinations on diagonals]
 * @param  {string} player [the player to check for diagonal wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has a winning diagonal]
 */
export function playerHasWonDiagonal(possible, grid, player) {
  const clone = copy(possible);

  return checkDiagonal(clone, ascending, player) ||
    checkDiagonal(clone, descending, player);
}

const ascending = [
  [false, false, true],
  [false, true, false],
  [true, false, false],
];

const descending = [
  [true, false, false],
  [false, true, false],
  [false, false, true],
];

export const checkDiagonal = (grid, winning) => {
  const score = grid
    .filter(({ x, y, player }) => player === possibleWinner && winning[x][y])
    .reduce(prev => prev + 1, 0);

  return score >= 3;
};

/**
 * [playerHasWon checks the board to see if given player has won]
 * @param  {string} player [the player to check for wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has won]
 */
export function playerHasWon(player, grid) {
  return playerHasWonColumn(player, grid) ||
    playerHasWonRow(player, grid) ||
    playerHasWonDiagonal(player, grid);
}
