import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        blog: './blog.html',
        publication: './publication.html',
        code: './code.html'
      }
    }
  }
});
