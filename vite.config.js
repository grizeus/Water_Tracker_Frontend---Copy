// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       src: '/src',
//       components: '/src/components',
//       pages: '/src/pages',
//     },
//   },
//   base: '/',
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      pages: '/src/pages',
    },
  },
  base: '/',
});
