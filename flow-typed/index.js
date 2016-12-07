import typeof {Num as int} from "../src/calculator/Num.js";

/* /src/calculator/expression.js */
declare type num = {
  kind: 'number',
  value: int
}

declare type str = {
  kind: 'string',
  value: string
}

declare type glyph = str | num

/* /src/calculator/expression.js */
declare type State = { 
  stack: Array<glyph>; 
  queue: Array<glyph>;
}

/* /calculator/index.js */
declare class NodeList<HTMLElement> {
  forEach(): void;
}

declare class Dataset {
  key: string;
}

declare class Target {
  dataset: Dataset;
}

declare class Event {
  target: Target;
}

/* Webpack */
declare type Module = {
  loaders: Object[];
};

declare type Output = {
  filename: string;
};

declare class WebpackConfiguration {
  entry: Object | string[] | string;
  output: Output;
  module: Module;
  postcss: ?Object[]; 
  plugins: ?Object[];
};
