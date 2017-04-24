declare class NodeList<T> {
  forEach(): void;
  item(): T;
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

declare class ResponseError extends Error {
  response: Response;
}

declare var afterEach: Function;
