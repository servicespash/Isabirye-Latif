import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
    },
    dedupe: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom',
      'react-helmet-async',
      'motion',
      'motion/react',
      'lucide-react',
      'recharts',
      'd3',
      'tsparticles',
      'tsparticles-engine',
      'tsparticles-slim',
      'qrcode.react',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },
  plugins: [
    react(),
    nodePolyfills({
      include: [
        'fs', 'path', 'os', 'buffer', 'stream', 'util', 'crypto', 'url', 
        'events', 'process', 'http', 'https', 'zlib', 'querystring', 
        'punycode', 'string_decoder', 'timers', 'tty', 'vm', 'tls', 'net', 'dns'
      ],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
