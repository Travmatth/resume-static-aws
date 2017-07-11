import type { Stream } from '../twitchtv.types';
import { fetchAllProfiles } from '../Api';
import { users } from '../Models';
import { trim } from 'common/js/utils';

const FILTER_EVENT = 'filter-event';

const removeChildren = (list: HTMLUListElement) => {
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};

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

/**
 * filterHandler should display element if status is 'all' or matches
 * elements type, add .hidden otherwise
 * @param {CustomEvent} event - event dispatched to listener, contains a status detail
 */
const filterHandler = (event: Event) => {
  const { target, detail: { status: nextStatus } } = event;
  const { dataset: { status: type } } = target;

  const t = true;
  nextStatus === 'all' || nextStatus === type
    ? target.classList.toggle('hidden', false)
    : target.classList.toggle('hidden', true);
};

const fetchHandler = (list: HTMLULElement) => async (_: Event) => {
  if (list.children.length !== 0) removeChildren(list);

  const nodes = document.createDocumentFragment();
  const streamers = await fetchAllProfiles(users);

  streamers.map((streamer: Stream) => {
    const li = document.createElement('li');
    li.innerHTML = require('../Assets/tile.html');
    if (!li.dataset) li.dataset = {};
    li.addEventListener(FILTER_EVENT, filterHandler);

    //_id === number || `${user} is offline`
    const isOnline = typeof streamer._id === 'number';
    const paragraph = li.querySelector('p');
    const a = li.querySelector('a');
    const h2 = li.querySelector('h2');

    if (isOnline) {
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
      } = streamer;

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
    } else {
      li.querySelector('.columns').remove();
      a.remove();
      h2.remove();

      paragraph.textContent = streamer._id;
      li.dataset.status = 'offline';
    }

    nodes.appendChild(li);
  });

  list.appendChild(nodes);
};

export { fetchHandler, removeChildren, filterHandler, toggleFilter };
