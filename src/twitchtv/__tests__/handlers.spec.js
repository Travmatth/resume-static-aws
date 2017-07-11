/* @flow */
import { removeChildren, fetchHandler, toggleFilter } from '../Handlers';
import { fetchAllProfiles } from '../Api';
import { dispatch } from 'tests/utils';

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
          status: 'status',
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
          status: 'status',
        },
      },
    ]),
}));

describe('TwitchTV Handlers', () => {
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

    expect(
      document.querySelector('li').dispatchEvent.mock.calls[0][0].detail.status,
    ).toBe('all');
  });

  it('filterHandler should toggle .hidden class according to next status', async () => {
    const node = document.createElement('ul');
    await fetchHandler(node)();

    const li1 = node.querySelector('li:nth-of-type(1)');
    const li2 = node.querySelector('li:nth-of-type(2)');

    dispatch(li1, 'filter-event', { detail: { status: 'offline' } });
    dispatch(li2, 'filter-event', { detail: { status: 'offline' } });

    expect(li1.classList.contains('hidden')).toBe(true);
    expect(li2.classList.contains('hidden')).toBe(false);
  });

  it('removeChildren should strip children from element', () => {
    const node1 = document.createElement('div');
    node1.appendChild(document.createElement('div'));
    removeChildren(node1);
    expect(node1.children.length).toBe(0);
  });

  it('list elements should listen for filter-event', async () => {
    const node = document.createElement('ul');
    await fetchHandler(node)();

    const li = node.querySelector('li:nth-of-type(1)');
    dispatch(li, 'filter-event', { detail: { status: 'offline' } });

    expect(li.classList.contains('hidden')).toBe(true);
  });

  it('fetchHandler should add filter-level data-attribute to list elements', async () => {
    const node = document.createElement('ul');
    await fetchHandler(node)();

    const firstLi = node.querySelector('li:nth-of-type(1)');
    const secondLi = node.querySelector('li:nth-of-type(2)');

    expect(firstLi.dataset.status).toBe('online');
    expect(secondLi.dataset.status).toBe('offline');
  });

  it('fetchHandler should remove children elements if present', async () => {
    const node = document.createElement('ul');
    const child = document.createElement('li');
    child.textContent = 'test';
    node.appendChild(child);

    await fetchHandler(node)();

    expect(node.querySelector('li')).not.toBe('test');
  });

  it('fetchHandler should call api and populate elements', async () => {
    const node = document.createElement('ul');
    await fetchHandler(node)();

    const img = node.querySelector('img');
    const a = node.querySelector('a');
    const h2 = node.querySelector('h2');
    const p = node.querySelector('p');

    expect(img.src).toBe('logo1');

    expect(a.href).toBe('url1');
    expect(a.textContent).toBe('display_name1');

    expect(h2.textContent).toBe('game1');

    expect(p.textContent).toBe('status');
  });
});
