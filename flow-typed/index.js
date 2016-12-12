declare class NodeList<HTMLElement> {
  forEach(): void;
}

declare class Event {
  target: HTMLElement;
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
