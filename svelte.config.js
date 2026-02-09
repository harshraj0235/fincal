import preprocess from 'svelte-preprocess';

/** @type {import('svelte').Config} */
const config = {
  compilerOptions: {
    customElement: true,
  },
  preprocess: preprocess({
    typescript: true,
  }),
};

export default config;
