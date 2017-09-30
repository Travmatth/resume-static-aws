import type { Stream } from '../twitchtv.types';
import { fetchAllProfiles, TWITCHTV_TIMEOUT } from '../Api';
import { trim, removeChildren, withTimeout } from 'common/js/utils';

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

const fetchHandler = (table: HTMLULElement, show: ?string => void) => async (
  _: Event,
) => {
  show('loading');
  if (table.children.length !== 0) removeChildren(table);

  const fragment = document.createDocumentFragment();
  let streamers;

  try {
    streamers = await withTimeout(fetchAllProfiles(), TWITCHTV_TIMEOUT);
    streamers.map((streamer: PossibleStream) => {
      const li = document.createElement('li');
      li.innerHTML = require('../Assets/tile.html');
      if (!li.dataset) li.dataset = {};
      li.addEventListener(FILTER_EVENT, filterHandler);

      const paragraph = li.querySelector('p');
      const a = li.querySelector('a');
      const h2 = li.querySelector('h2');

      // Create online player tile
      if (!streamer.error) {
        const {
          game,
          channel: {
            status,
            profile_banner,
            video_banner,
            url,
            banner,
            logo,
            display_name,
          },
        } = streamer.stream;

        li
          .querySelector('.tile-container')
          .classList.toggle('tile-container', false);

        h2.textContent = game;
        paragraph.textContent = status;

        const img = li.querySelector('img');
        const error = ({ target: el }: Event) =>
          el.src = require('../Assets/Twitch_Black_RGB');

        img.onerror = error;
        img.src = profile_banner || video_banner || banner || logo;

        a.href = url;
        a.textContent = display_name;
        li.dataset.status = 'online';

        // Create offline player tile
      } else {
        li.querySelector('.columns').remove();
        a.remove();
        h2.remove();

        paragraph.textContent = streamer.status;
        li.dataset.status = 'offline';
      }

      fragment.appendChild(li);
    });

    table.appendChild(fragment);
    show('profiles');
  } catch (error) {
    console.error(error);
    show('error');
  }
};

export { fetchHandler, removeChildren, filterHandler, toggleFilter, showScene };
