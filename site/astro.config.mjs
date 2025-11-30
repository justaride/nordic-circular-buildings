// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://justaride.github.io',
  base: '/nordic-circular-buildings',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});