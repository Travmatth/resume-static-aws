/* @flow */

import type { WikiSearchResult, WikiPage } from '../wikiviewer.types';

// https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro=1&explaintext=1&exsentences=10&exlimit=20&gsrsearch=""&redirects=1
const exampleWikipediaSearch: WikiSearchResult = {
  batchcomplete: '',
  continue: {
    gsroffset: 10,
    continue: 'gsroffset||',
  },
  query: {
    pages: {
      '11937256': {
        pageid: 11937256,
        ns: 0,
        title: 'Big Boss',
        index: 8,
        extract: 'Big Boss may refer to:',
      },
      '7803425': {
        pageid: 7803425,
        ns: 0,
        title: 'Bigg Boss',
        index: 7,
        extract: 'Bigg Boss is a television reality show broadcast on Colors channel in India.',
      },
      '248811': {
        pageid: 248811,
        ns: 0,
        title: 'Boss',
        index: 1,
        extract: 'A boss is a person in charge, or a supervisor.',
      },
      '3708640': {
        pageid: 3708640,
        ns: 0,
        title: 'Boss (architecture)',
        index: 4,
        extract: 'In architecture, a boss is a knob or protrusion of stone or wood.',
      },
      '2029109': {
        pageid: 2029109,
        ns: 0,
        title: 'Boss (crime)',
        index: 6,
        extract: 'A crime boss, crime lord, mob boss, kingpin, criminal mastermind, or Don is a person in charge of a criminal organization.',
      },
      '249431': {
        pageid: 249431,
        ns: 0,
        title: 'Boss (video gaming)',
        index: 2,
        extract: 'In video gaming, a boss is a significant computer-controlled enemy.',
      },
      '629316': {
        pageid: 629316,
        ns: 0,
        title: 'Boss Corporation',
        index: 9,
        extract: 'Boss is a manufacturer of effects pedals for electric guitar and bass guitar.',
      },
      '1696801': {
        pageid: 1696801,
        ns: 0,
        title: 'Hugo Boss',
        index: 10,
        extract: 'Hugo Boss AG, often styled as BOSS, is a German luxury fashion house.',
      },
      '1830882': {
        pageid: 1830882,
        ns: 0,
        title: 'Political boss',
        index: 3,
        extract: 'A boss, in politics, is a person who controls a unit of a political party, although he/she may not hold political office.',
      },
      '22865223': {
        pageid: 22865223,
        ns: 0,
        title: 'Undercover Boss',
        index: 5,
        extract: 'Undercover Boss is a television franchise series created by Stephen Lambert and produced in many countries.',
      },
    },
  },
  limits: {
    extracts: 20,
  },
};

const wikis: Array<WikiPage> = [
  {
    pageid: 7803425,
    ns: 0,
    title: 'Bigg Boss',
    index: 7,
    extract: 'Bigg Boss is a television reality show broadcast on Colors channel in India.',
  },
  {
    pageid: 248811,
    ns: 0,
    title: 'Boss',
    index: 1,
    extract: 'A boss is a person in charge, or a supervisor.',
  },
  {
    pageid: 3708640,
    ns: 0,
    title: 'Boss (architecture)',
    index: 4,
    extract: 'In architecture, a boss is a knob or protrusion of stone or wood.',
  },
  {
    pageid: 2029109,
    ns: 0,
    title: 'Boss (crime)',
    index: 6,
    extract: 'A crime boss, crime lord, mob boss, kingpin, criminal mastermind, or Don is a person in charge of a criminal organization.',
  },
  {
    pageid: 249431,
    ns: 0,
    title: 'Boss (video gaming)',
    index: 2,
    extract: 'In video gaming, a boss is a significant computer-controlled enemy.',
  },
  {
    pageid: 629316,
    ns: 0,
    title: 'Boss Corporation',
    index: 9,
    extract: 'Boss is a manufacturer of effects pedals for electric guitar and bass guitar.',
  },
  {
    pageid: 1696801,
    ns: 0,
    title: 'Hugo Boss',
    index: 10,
    extract: 'Hugo Boss AG, often styled as BOSS, is a German luxury fashion house.',
  },
  {
    pageid: 1830882,
    ns: 0,
    title: 'Political boss',
    index: 3,
    extract: 'A boss, in politics, is a person who controls a unit of a political party, although he/she may not hold political office.',
  },
  {
    pageid: 22865223,
    ns: 0,
    title: 'Undercover Boss',
    index: 5,
    extract: 'Undercover Boss is a television franchise series created by Stephen Lambert and produced in many countries.',
  },
];

const extract = [
  {
    extract: 'A boss is a person in charge, or a supervisor.',
    index: 1,
    ns: 0,
    pageid: 248811,
    title: 'Boss',
  },
  {
    extract: 'In video gaming, a boss is a significant computer-controlled enemy.',
    index: 2,
    ns: 0,
    pageid: 249431,
    title: 'Boss (video gaming)',
  },
  {
    extract: 'Boss is a manufacturer of effects pedals for electric guitar and bass guitar.',
    index: 9,
    ns: 0,
    pageid: 629316,
    title: 'Boss Corporation',
  },
  {
    extract: 'Hugo Boss AG, often styled as BOSS, is a German luxury fashion house.',
    index: 10,
    ns: 0,
    pageid: 1696801,
    title: 'Hugo Boss',
  },
  {
    extract: 'A boss, in politics, is a person who controls a unit of a political party, although he/she may not hold political office.',
    index: 3,
    ns: 0,
    pageid: 1830882,
    title: 'Political boss',
  },
  {
    extract: 'A crime boss, crime lord, mob boss, kingpin, criminal mastermind, or Don is a person in charge of a criminal organization.',
    index: 6,
    ns: 0,
    pageid: 2029109,
    title: 'Boss (crime)',
  },
  {
    extract: 'In architecture, a boss is a knob or protrusion of stone or wood.',
    index: 4,
    ns: 0,
    pageid: 3708640,
    title: 'Boss (architecture)',
  },
  {
    extract: 'Bigg Boss is a television reality show broadcast on Colors channel in India.',
    index: 7,
    ns: 0,
    pageid: 7803425,
    title: 'Bigg Boss',
  },
  {
    extract: 'Big Boss may refer to:',
    index: 8,
    ns: 0,
    pageid: 11937256,
    title: 'Big Boss',
  },
  {
    extract: 'Undercover Boss is a television franchise series created by Stephen Lambert and produced in many countries.',
    index: 5,
    ns: 0,
    pageid: 22865223,
    title: 'Undercover Boss',
  },
];

export { exampleWikipediaSearch, extract, wikis };
