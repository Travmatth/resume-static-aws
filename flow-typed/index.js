/* /src/calculator/expression.js */
declare type State = { stack: Array<glyph>, queue: Array<glyph> }

/* /common/BinaryTree.js */
declare type processTree = (a: number, b: number) => number

/* /calculator/index.js */
declare type operation = {
  precedence: number
  perform: (number, number) => number
}

declare type glyph = string|number

type Module = {
  loaders: Object[];
};

type Output = {
  filename: string;
};

declare class WebpackConfiguration {
  entry: Object | string[] | string;
  output: Output;
  module: Module;
  postcss: ?Object[]; 
  plugins: ?Object[];
};

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