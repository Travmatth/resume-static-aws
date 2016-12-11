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
