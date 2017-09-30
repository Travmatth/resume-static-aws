/* @flow */

export type Paragraphs = HTMLCollection<HTMLParagraphElement>;
export type Headings = HTMLCollection<HTMLElement>;

export type WikiPage = {
  'pageid': number,
  'ns': number,
  'title': string,
  'index': number,
  'extract': string,
};

export type Searches = ?Array<WikiPage>;

export type WikiContinue = {
  'gsroffset': 10,
  'continue': 'gsroffset||',
};

export type Limits = {
  extracts: number,
};

export type WikiPages = {
  [string]: WikiPage,
};

export type QueryResult = {
  'pages': WikiPages,
};

export type WikiSearchResult = {|
  'batchcomplete': '' | true,
  'continue': WikiContinue,
  'query': QueryResult,
  'limits': Limits,
|};
