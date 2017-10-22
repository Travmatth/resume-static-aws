/* @flow */
/* eslint-env jest */

import {
  createStreamerTile,
  populateListElement,
  populateHeadingElement,
  populateAnchorElement,
  populateImageElement,
  createTileElement,
  removeChildren,
  fetchHandler,
  toggleFilter,
  showScene,
  FILTER_EVENT,
  filterHandler,
} from '../Handlers';
import * as Api from '../Api';
import { dispatch } from 'tests/utils';

jest.mock('../Assets/Twitch_Black_RGB.png', () => 'stub');

jest.mock('../Api', () => ({
  fetchAllProfiles: jest.fn(),
  TWITCHTV_TIMEOUT: 0,
}));

let show;
let spinner;
let profiles;
let error;

const fetchResponse = [
  {
    error: false,
    stream: {
      _id: 1,
      game: 'game1',
      viewers: 'viewers1',
      channel: {
        logo: 'logo1',
        url: 'url1',
        display_name: 'display_name1',
        status: 'status',
      },
    },
  },
  {
    error: true,
    status: '',
  },
];

describe('TwitchTV Handlers', () => {
  beforeEach(() => {
    show = jest.fn();
    spinner = document.createElement('div');
    profiles = document.createElement('div');
    error = document.createElement('div');
  });

  it('list elements should listen for filter-event', async () => {
    Api.fetchAllProfiles = Api.fetchAllProfiles.mockImplementationOnce(() =>
      Promise.resolve(fetchResponse),
    );

    const node = document.createElement('ul');
    await fetchHandler(node, show)();

    const li = node.querySelector('li:nth-of-type(1)');
    dispatch(li, FILTER_EVENT, { detail: { status: 'offline' } });

    expect(li.classList.contains('hidden')).toBe(true);
  });

  it('showScene should set loading state correctly', () => {
    show = showScene(spinner, error, profiles);
    show('loading');

    expect(spinner.classList.contains('hidden')).toBe(false);
    expect(profiles.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(true);
  });

  it('showScene should set profiles state correctly', () => {
    show = showScene(spinner, error, profiles);
    show('profiles');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(profiles.classList.contains('hidden')).toBe(false);
    expect(error.classList.contains('hidden')).toBe(true);
  });

  it('showScene should set error state correctly', () => {
    show = showScene(spinner, error, profiles);
    show('error');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(profiles.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(false);
  });

  it('showScene should default to hiding all elements', () => {
    show = showScene(spinner, error, profiles);
    show('');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(profiles.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(true);
  });

  it('createTileElement should return tile and its children', () => {
    const tile = require('../Assets/tile.html');
    const { li, paragraph, a, h2, img } = createTileElement(tile);

    expect(li.nodeName).toBe('LI');
    expect(paragraph.nodeName).toBe('P');
    expect(a.nodeName).toBe('A');
    expect(h2.nodeName).toBe('H2');
    expect(img.nodeName).toBe('IMG');
  });

  it('populateListElement should set element when online', () => {
    const { li } = createTileElement(require('../Assets/tile.html'));
    const fn = jest.fn();
    populateListElement(true, li, fn);

    expect(li.dataset.status).toBe('online');
    expect(li.querySelector('.tile-container')).toBe(null);

    dispatch(li, FILTER_EVENT);
    expect(fn).toHaveBeenCalled();
  });

  it('populateListElement should set element when offline', () => {
    const { li } = createTileElement(require('../Assets/tile.html'));
    const fn = jest.fn();
    const spy = jest.spyOn(li.querySelector('.columns'), 'remove');
    populateListElement(false, li, fn);

    expect(li.dataset.status).toBe('offline');
    expect(spy).toHaveBeenCalled();

    dispatch(li, FILTER_EVENT);
    expect(fn).toHaveBeenCalled();
  });

  it('populateHeadingElement should set element when online', () => {
    const { h2 } = createTileElement(require('../Assets/tile.html'));
    const spy = jest.spyOn(h2, 'remove');
    populateHeadingElement(h2, 'stub');

    expect(h2.textContent).toBe('stub');
    expect(spy).not.toHaveBeenCalled();
  });

  it('populateHeadingElement should set element when offline', () => {
    const { h2 } = createTileElement(require('../Assets/tile.html'));
    const spy = jest.spyOn(h2, 'remove');

    populateHeadingElement(h2);

    expect(spy).toHaveBeenCalled();
  });

  it('populateAnchorElement should set element when online', () => {
    const { a } = createTileElement(require('../Assets/tile.html'));
    const spy = jest.spyOn(a, 'remove');

    populateAnchorElement(true, a, 'name', 'url');

    expect(a.href).toBe('url');
    expect(a.textContent).toBe('name');
    expect(spy).not.toHaveBeenCalled();
  });

  it('populateAnchorElement should set element when offline', () => {
    const { a } = createTileElement(require('../Assets/tile.html'));
    const spy = jest.spyOn(a, 'remove');

    populateAnchorElement(true, a);

    expect(spy).toHaveBeenCalled();
  });

  it('populateImageElement should set element', () => {
    const { img } = createTileElement(require('../Assets/tile.html'));

    populateImageElement(img, 'default', {
      profile_banner: null,
      video_banner: null,
      banner: null,
      logo: 'logo',
    });

    expect(img.src).toBe('logo');

    const stub = { target: { src: null } };
    img.onerror(stub);

    expect(stub.target.src).toBe('stub');
  });

  it('createStreamerTile should return properly set tile', () => {
    const tile = require('../Assets/tile.html');
    const defaultLogo = 'default';
    const fragment = document.createDocumentFragment();

    createStreamerTile(tile, defaultLogo, fragment)({
      error: false,
      stream: {
        game: 'game',
        channel: {
          banner: null,
          display_name: 'display_name',
          logo: 'logo',
          profile_banner: null,
          status: 'status',
          url: 'url',
          video_banner: null,
        },
      },
    });

    const a = fragment.querySelector('a');
    const li = fragment.querySelector('li');

    expect(fragment.querySelector('img').src).toBe('logo');
    expect(a.href).toBe('url');
    expect(a.textContent).toBe('display_name');
    expect(li.dataset.status).toBe('online');
    expect(li.querySelector('.tile-container')).toBe(null);
    expect(fragment.querySelector('h2').textContent).toBe('game');
    // commenting out these lines will cause later func to crash, why?
    //const p = fragment.querySelector('p');
    //expect(p.textContent).toBe('status');
  });

  it('filterHandler should use .hidden class when status is all', () => {
    const event = {
      target: {
        dataset: {
          status: '',
        },
        classList: {
          toggle: jest.fn(),
        },
      },
      detail: {
        status: 'all',
      },
    };

    filterHandler(event);

    expect(event.target.classList.toggle).toHaveBeenCalledWith('hidden', false);
  });

  it('filterHandler should not use .hidden class when status === type ', () => {
    const event = {
      target: {
        dataset: {
          status: 'b',
        },
        classList: {
          toggle: jest.fn(),
        },
      },
      detail: {
        status: 'b',
      },
    };

    filterHandler(event);

    expect(event.target.classList.toggle).toHaveBeenCalledWith('hidden', false);
  });

  it('filterHandler should not use .hidden class when status !== type ', () => {
    const event = {
      target: {
        dataset: {
          status: 'b',
        },
        classList: {
          toggle: jest.fn(),
        },
      },
      detail: {
        status: 'a',
      },
    };

    filterHandler(event);

    expect(event.target.classList.toggle).toHaveBeenCalledWith('hidden', true);
  });

  it('removeChildren should strip children from element', () => {
    const node1 = document.createElement('div');
    node1.appendChild(document.createElement('div'));
    removeChildren(node1);
    expect(node1.children.length).toBe(0);
  });

  it('fetchHandler should add filter-level data-attribute to list elements', async () => {
    Api.fetchAllProfiles = Api.fetchAllProfiles.mockImplementationOnce(() =>
      Promise.resolve(fetchResponse),
    );
    const node = document.createElement('ul');
    await fetchHandler(node, show)();

    const firstLi = node.querySelector('li:nth-of-type(1)');
    const secondLi = node.querySelector('li:nth-of-type(2)');

    expect(firstLi.dataset.status).toBe('online');
    expect(secondLi.dataset.status).toBe('offline');
  });

  it('fetchHandler should remove children elements if present', async () => {
    Api.fetchAllProfiles = Api.fetchAllProfiles.mockImplementationOnce(() =>
      Promise.resolve(fetchResponse),
    );

    const node = document.createElement('ul');
    const child = document.createElement('li');
    child.textContent = 'test';
    node.appendChild(child);

    await fetchHandler(node, show)();

    expect(node.querySelector('li')).not.toBe('test');
  });

  it('fetchHandler should call api and populate elements', async () => {
    Api.fetchAllProfiles = Api.fetchAllProfiles.mockImplementationOnce(() =>
      Promise.resolve(fetchResponse),
    );

    const node = document.createElement('ul');
    await fetchHandler(node, show)();

    const img = node.querySelector('img');
    const a = node.querySelector('a');
    const h2 = node.querySelector('h2');
    const p = node.querySelector('p');

    expect(show.mock.calls[0][0]).toBe('loading');
    expect(show.mock.calls[1][0]).toBe('profiles');
    expect(img.src).toBe('logo1');

    expect(a.href).toBe('url1');
    expect(a.textContent).toBe('display_name1');

    expect(h2.textContent).toBe('game1');

    expect(p.textContent).toBe('status');
  });

  it('fetchHandler should show error if fetch throws', async () => {
    Api.fetchAllProfiles = Api.fetchAllProfiles.mockImplementationOnce(() =>
      Promise.reject('error'),
    );

    const node = document.createElement('ul');
    await fetchHandler(node, show)();

    expect(show.mock.calls[0][0]).toBe('loading');
    expect(show.mock.calls[1][0]).toBe('error');
  });

  it('toggleFilter should dispatch filter-event on given element', async () => {
    document.body.innerHTML = `
      <li></li>
      <li></li>
    `;

    document.querySelectorAll('li').forEach(el => {
      el.dispatchEvent = jest.fn();
      el.dataset = {
        status: 'online',
      };
    });

    toggleFilter('all')();

    const spy = document.querySelector('li').dispatchEvent;

    expect(spy.mock.calls[0][0].detail.status).toBe('all');
  });
});
