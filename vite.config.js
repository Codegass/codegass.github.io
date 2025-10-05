import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  root: 'src/pages',
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        blog: resolve(__dirname, 'src/pages/blog.html'),
        article: resolve(__dirname, 'src/pages/article.html'),
        publication: resolve(__dirname, 'src/pages/publication.html'),
        code: resolve(__dirname, 'src/pages/code.html')
      }
    }
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src')
    }
  }
});
