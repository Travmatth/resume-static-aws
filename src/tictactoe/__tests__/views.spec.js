/* @flow */

import {
  render,
  update,
  createStartView,
  sideSelectionButton,
  startButton,
  createPlayView,
  gameTile,
  undoButton,
  createScoreView,
  scoreElement,
  lifecycleButton,
} from '../Views';
import { Game } from '../Models';

describe('TicTacToe Views', () => {
  describe('Helpers', () => {
    it('render should append initial node', () => {
      const root = document.createElement('div');
      const el = ((document.createElement('div'): any): DocumentFragment);
      el.textContent = 'test';

      render(root, null, el)();

      expect(root.children[0].textContent).toBe('test');
    });

    it('render should replace one view with another', () => {
      const root = document.createElement('div');
      const first = ((document.createElement('div'): any): DocumentFragment);
      const second = ((document.createElement('div'): any): DocumentFragment);

      first.textContent = 'first';
      second.textContent = 'second';

      render(root, null, first)();
      render(root, first, second)();

      expect(root.children[0].textContent).toBe('second');
    });

    it('update should iterate over squares and update their textContent', () => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createElement('div'));
      frag.appendChild(document.createElement('div'));
      frag.appendChild(document.createElement('div'));
      const latest = ['a', 'b', 'c'];

      update(frag)(latest);

      for (let i = 0; i < 3; i++) {
        expect(frag.children[i].textContent).toBe(latest[i]);
      }
    });
  });

  describe('Play View', () => {
    it('createPlayView should create a documentFragment with game squares', () => {
      const frag = document.createDocumentFragment();
      const move = jest.fn();
      const undo = jest.fn();

      const play = createPlayView(frag, move, undo);

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          expect(play.children[x * 3 + y].dataset.x).toBe(`${x}`);
          expect(play.children[x * 3 + y].dataset.y).toBe(`${y}`);
        }
      }
    });

    it('gameTile should create a HTMLElement with given coordinates', () => {
      const move = jest.fn();
      const elem = gameTile(0, 0, move);
      elem.click();

      expect(elem.dataset.x).toBe(`${0}`);
      expect(elem.dataset.x).toBe(`${0}`);
      expect(move).toHaveBeenCalled();
    });

    it("undoButton should register an undo function on given element's 'click' listener", () => {
      const undo = jest.fn();
      const btn = undoButton(undo);
      btn.click();

      expect(btn.textContent).toBe('Undo Move');
      expect(undo).toHaveBeenCalled();
    });
  });

  describe('Score View', () => {
    it('createScoreView shoud create a documentFragment with game options', () => {
      const game = new Game();
      const frag = document.createDocumentFragment();
      const restart = jest.fn();
      const reset = jest.fn();
      const transition = jest.fn();

      const scoreView = createScoreView(frag, restart, reset, transition, game);
      scoreView.children[2].click();
      scoreView.children[3].click();

      expect(scoreView.children[0].textContent).toBe('0');
      expect(scoreView.children[1].textContent).toBe('0');
      expect(scoreView.children[2].textContent).toBe('restart');
      expect(scoreView.children[3].textContent).toBe('reset');
      expect(reset).toHaveBeenCalled();
      expect(restart).toHaveBeenCalled();
    });

    it('scoreElement should create HTMLElement with given Side', () => {
      const elem = scoreElement(new Game(), 'X');
      expect(elem.textContent).toBe('0');
    });

    it("lifecycleButton should create button with given text and 'click' listener", () => {
      const trigger = jest.fn();
      const elem = lifecycleButton('test', trigger);
      elem.click();

      expect(elem.textContent).toBe('test');
      expect(trigger).toHaveBeenCalled();
    });
  });

  describe('Start View', () => {
    it('createStartView should create beginning view', () => {
      const frag = document.createDocumentFragment();
      const start = jest.fn();
      const choose = jest.fn();

      const startView = createStartView(frag, start, choose);

      startView.children[0].click();
      startView.children[1].click();
      startView.children[2].click();

      expect(start).toHaveBeenCalled();
      expect(choose).toHaveBeenCalledTimes(2);
    });

    it("startButton should create HTMLButtonElement with given text and 'click' listener", () => {
      const handler = jest.fn();

      const start = startButton(handler);
      start.click();

      expect(start.textContent).toBe('start');
      expect(handler).toHaveBeenCalled();
    });

    it('sideSelectionButton should create button with given glyph and ', () => {
      const choose = jest.fn();
      const side = sideSelectionButton('X', choose);
      side.click();
      expect(side.textContent).toBe('X');
      expect(side.dataset.glyph).toBe('X');
      expect(choose).toHaveBeenCalled();
    });
  });
});
