import { Side } from '../tictactoe.types';

const updateScoreEvent = 'UPDATE_SCORE';

const dispatchUpdateScore = (glyph: $Keys<typeof Side>, score: number) =>
  document.querySelector(`#${glyph}-score`).dispatchEvent(
    new CustomEvent(updateScoreEvent, {
      bubbles: false,
      detail: score,
    }),
  );

export { updateScoreEvent, dispatchUpdateScore };
