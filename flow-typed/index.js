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