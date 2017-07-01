import type { Game } from '../Models';

const updateScoreEvent = (view: DocumentFragment) => (
  selector: string,
  score: number,
) =>
  view
    .querySelector(selector)
    .dispatchEvent(new CustomEvent(updateEvent, { detail: score }));

const updateEvent = 'update';

export { updateEvent, updateScoreEvent };
