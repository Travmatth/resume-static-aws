// The start menu allows the player to choose between the X or O glyph
const createStartView = (
  fragment: DocumentFragment,
  handler: (e: Event) => void,
  choose: (game: Game, desired: $Keys<typeof Side>) => void,
  game: Game,
  bind: () => void,
) => {
  // Pressed in the start screen, should select a side for the player
  const x = sideSelectionButton(Player.X, choose, game);
  const o = sideSelectionButton(Player.O, choose, game);
  // Pressed in the start screen, should start the game by switching views
  const start = startButton(handler);

  fragment.appendChild(x);
  fragment.appendChild(o);
  fragment.appendChild(start);

  return fragment;
};

const startButton = (handler: (e: Event) => void) => {
  const start = document.createElement('button');
  start.textContent = 'start';
  start.addEventListener('click', handler);
  return start;
};

const sideSelectionButton = (
  glyph: $Keys<typeof Side>,
  choose: (game: Game, desired: $Keys<typeof Side>) => void,
  game: Game,
) => {
  const select = document.createElement('button');
  start.textContent = glyph;
  start.addEventListener('click', choose(game, glyph));
  return select;
};

export { startButton, sideSelectionButton, createStartView };
