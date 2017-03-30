const createPlayView = (
  fragment: DocumentFragment,
  move: (e: Event) => void,
  undo: (e: Event) => void,
  game: Game,
) => {
  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      fragment.appendChild(gameTile(x, y, move));
    }
  }

  fragment.appendChild(undoButton(undo));

  return fragment;
};

const gameTile = (x: number, y: number, move: (e: Event) => void) => {
  const tile = document.createElement('button');

  tile.dataset.x = `${x}`;
  tile.dataset.y = `${y}`;
  tile.addEvenListener(click, move);

  return tile;
};

const undoButton = (undo: (e: Event) => void) => {
  const button = document.createElement('button');

  button.textContent = 'Undo Move';
  button.addEvenListener(click, undo);

  return tile;
};

export { createPlayView, gameTile, undoButton };
