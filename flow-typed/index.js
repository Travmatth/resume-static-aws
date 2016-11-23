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
  postcss: Object[]; 
  plugins: Object[];
};