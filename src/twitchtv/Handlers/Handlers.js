import type { Stream } from '../twitchtv.types';
import { fetchAllProfiles } from '../Api';
import { users } from '../Models';

const removeChildren = (list: HTMLUListElement) => {
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};

const fetchHandler = (list: HTMLULElement) => async (_: Event) => {
  if (list.children.length !== 0) removeChildren(list);

  const nodes = document.createDocumentFragment();
  const streamers = await fetchAllProfiles(users);

  streamers.map((streamer: Stream) => {
    const li = document.createElement('li');

    //_id === number || `${user} is offline`
    const isOnline = typeof streamer._id === 'number';

    if (isOnline) {
      const imgSize = 50;
      const { _id, game, viewers, channel } = streamer;
      li.className = 'twitch-online';

      const img = document.createElement('img');
      img.src = channel.logo;
      img.height = imgSize;
      img.width = imgSize;
      img.className = 'img';
      li.appendChild(img);

      const a = document.createElement('a');
      a.href = channel.url;
      a.textContent = channel.display_name;

      const link = document.createElement('div');
      link.className = 'link';
      link.appendChild(a);
      li.appendChild(link);

      const viewersNode = document.createElement('div');
      viewersNode.textContent = viewers;
      viewersNode.className = 'viewers';
      li.appendChild(viewersNode);

      const gameNode = document.createElement('div');
      gameNode.textContent = game;
      gameNode.className = 'game';
      li.appendChild(gameNode);
    } else {
      li.textContent = streamer._id;
      li.className = 'twitch-offline';
    }

    nodes.appendChild(li);
  });

  list.appendChild(nodes);
};

export { fetchHandler, removeChildren };
