const createScoreView = (fragment: DocumentFragment, restart, reset, game) => {
  const yScore = scoreButton('y');
  const xScore = scoreButton('x');
  const reset = lifecycleButton(game, update);
  const restart = lifecycleButton();

  fragment.appendChild(xScore);
  fragment.appendChild(yScore);
  fragment.appendChild(reset);
  fragment.appendChild(restart);

  return fragment;
};

const scoreButton = () => {};

const lifecycleButton = () => {};

export { createScoreView, scoreButton, lifecycleButton };
