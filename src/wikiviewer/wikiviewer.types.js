export type WikiContinue {
  "gsroffset":10,
  "continue":"gsroffset||"
};

export type WikiPage {
  "pageid": number;
  "ns": number;
  "title": string;
  "index": number;
  "extract": string; 
}

export type Limits {
  "extracts":20
}

export type WikiPages {|
  [string]: WikiPage,
  "limits": Limits;
|};

export type QueryResult {
  "pages": WikiPages;  
};

export type WikiSearchResult {|
  "batchcomplete": ""|true,
  "continue": WikiContinue;
  "query": QueryResult;
|};
