import type { Channel } from '../twitchtv.types';
import { fetchAllProfiles, TWITCHTV_TIMEOUT } from '../Api';
import { removeChildren, withTimeout } from 'common/js/Utils';

const FILTER_EVENT = 'filter-event';

// cannot pass in NodeList at startup, elements dynamically created
const toggleFilter = (filterEvent: 'all' | 'online' | 'offline') => () =>
  document.querySelectorAll('li').forEach(el =>
    el.dispatchEvent(
      new CustomEvent(FILTER_EVENT, {
        bubbles: true,
        detail: {
          status: filterEvent,
        },
      }),
    ),
  );

const filterHandler = ({ target, detail: { status: nextStatus } }: Event) => {
  const { dataset: { status: type } } = target;

  nextStatus === 'all' || nextStatus === type
    ? target.classList.toggle('hidden', false)
    : target.classList.toggle('hidden', true);
};

const showScene = (
  spinner: HTMLElement,
  error: HTMLElement,
  profiles: HTMLElement,
) => (state: 'loading' | 'error' | 'profiles') => {
  let spinnerHidden;
  let errorHidden;
  let profilesHidden;

  switch (state) {
    case 'loading':
      spinnerHidden = false;
      errorHidden = true;
      profilesHidden = true;
      break;

    case 'error':
      spinnerHidden = true;
      errorHidden = false;
      profilesHidden = true;
      break;

    case 'profiles':
      spinnerHidden = true;
      errorHidden = true;
      profilesHidden = false;
      break;

    default:
      spinnerHidden = true;
      errorHidden = true;
      profilesHidden = true;
      break;
  }

  spinner.classList.toggle('hidden', spinnerHidden);
  error.classList.toggle('hidden', errorHidden);
  profiles.classList.toggle('hidden', profilesHidden);
};

const createTileElement = (tile: string) => {
  const li = document.createElement('li');
  li.innerHTML = tile;

  return {
    li,
    paragraph: li.querySelector('p'),
    a: li.querySelector('a'),
    h2: li.querySelector('h2'),
    img: li.querySelector('img'),
  };
};

const populateListElement = (
  online: boolean,
  li: HTMLLIElement,
  handler: () => void,
) => {
  if (!li.dataset) li.dataset = {};
  li.addEventListener(FILTER_EVENT, handler);
  li.dataset.status = online ? 'online' : 'offline';

  if (online) {
    li
      .querySelector('.tile-container')
      .classList.toggle('tile-container', false);
  } else {
    li.querySelector('.columns').remove();
  }
};

const populateHeadingElement = (h2: HTMLHeadingElement, game: ?string) => {
  if (game) {
    h2.textContent = game;
  } else {
    h2.remove();
  }
};

const populateAnchorElement = (
  online: boolean,
  a: HTMLAnchorElement,
  name: ?string,
  url: ?string,
) => {
  if (online && typeof name === 'string' && typeof url === 'string') {
    a.href = url;
    a.textContent = name;
  } else {
    a.remove();
  }
};

const populateImageElement = (
  img: HTMLImgElement,
  defaultLogo: string,
  { banner, profile_banner, video_banner, logo }: Channel,
) => {
  img.src = profile_banner || video_banner || banner || logo;
  img.onerror = ({ target: el }: Event) => {
    el.src = require('../Assets/Twitch_Black_RGB.png');
  };
};

const createStreamerTile = (
  tile: string,
  defaultLogo: string,
  fragment: DocumentFragment,
) => (streamer: PossibleStream) => {
  const { li, paragraph, a, h2, img } = createTileElement(tile);

  if (!streamer.error) {
    // Create online player tile
    const { game, channel } = streamer.stream;
    const { status, url, display_name } = channel;

    paragraph.textContent = status;
    populateListElement(true, li, filterHandler);
    populateHeadingElement(h2, game);
    populateAnchorElement(true, a, display_name, url);
    populateImageElement(img, defaultLogo, channel);
  } else {
    // Create offline player tile
    paragraph.textContent = streamer.status;
    populateListElement(false, li);
    populateHeadingElement(h2);
    populateAnchorElement(false, a);
  }

  fragment.appendChild(li);
};

const fetchHandler = (table: HTMLULElement, show: ?string => void) => async (
  _: Event,
) => {
  show('loading');
  if (table.children.length !== 0) removeChildren(table);

  let streamers;
  const tile = require('../Assets/tile.html');
  const defaultLogo = require('../Assets/Twitch_Black_RGB.png');
  const fragment = document.createDocumentFragment();
  const create = createStreamerTile(tile, defaultLogo, fragment);

  try {
    streamers = await withTimeout(fetchAllProfiles(), TWITCHTV_TIMEOUT);
    streamers.forEach(create);
    table.appendChild(fragment);
    show('profiles');
  } catch (error) {
    console.error(error);
    //console.log(error);
    show('error');
  }
};

export {
  createTileElement,
  createStreamerTile,
  populateListElement,
  populateHeadingElement,
  populateAnchorElement,
  populateImageElement,
  fetchHandler,
  removeChildren,
  filterHandler,
  toggleFilter,
  showScene,
  FILTER_EVENT,
};
