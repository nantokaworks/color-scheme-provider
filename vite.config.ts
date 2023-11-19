import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import noBundlePlugin from 'vite-plugin-no-bundle'

export default defineConfig({
  plugins: [
    react(),
    noBundlePlugin({ copy: '**/*.css' }),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
