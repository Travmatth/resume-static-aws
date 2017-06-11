/* @flow */
import { removeChildren, fetchHandler } from '../Handlers';
import { fetchAllProfiles } from '../Api';

jest.mock('../Api', () => ({
  fetchAllProfiles: () =>
    Promise.resolve([
      {
        _id: 1,
        game: 'game1',
        viewers: 'viewers1',
        channel: {
          logo: 'logo1',
          url: 'url1',
          display_name: 'display_name1',
        },
      },
      {
        _id: '_id2',
        game: 'game2',
        viewers: 'viewers2',
        channel: {
          logo: 'logo2',
          url: 'url2',
          display_name: 'display_name2',
        },
      },
    ]),
}));

describe('TwitchTV Handlers', () => {
  it('removeChildren should strip children from element', () => {
    const node1 = document.createElement('div');
    node1.appendChild(document.createElement('div'));
    removeChildren(node1);
    expect(node1.children.length).toBe(0);
  });

  it('fetchHandler should call api and populate elements', async () => {
    const node = document.createElement('ul');
    node.appendChild(document.createElement('div'));
    await fetchHandler(node)();

    expect(node.children.length).toBe(2);

    const img = ((node.children[0].children[0]: any): HTMLImageElement);
    const a = ((node.children[0].children[1]
      .children[0]: any): HTMLAnchorElement);
    const link = node.children[0].children[1];
    const viewers = node.children[0].children[2];
    const game = node.children[0].children[3];

    expect(node.children[0].className).toBe('twitch-online');

    expect(img.src).toBe('logo1');
    expect(img.height).toBe(50);
    expect(img.width).toBe(50);
    expect(img.className).toBe('img');

    expect(a.href).toBe('url1');
    expect(a.textContent).toBe('display_name1');

    expect(link.className).toBe('link');

    expect(viewers.className).toBe('viewers');
    expect(viewers.textContent).toBe('viewers1');

    expect(game.className).toBe('game');
    expect(game.textContent).toBe('game1');

    const empty = node.children[1];

    expect(empty.textContent).toBe('_id2');
    expect(empty.className).toBe('twitch-offline');
  });
});
