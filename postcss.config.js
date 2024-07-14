import { ProcessOptions } from 'postcss';

const config: {
  plugins: {
    [key: string]: any;
  };
  options?: ProcessOptions;
} = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
