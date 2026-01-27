import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      // Bundle analyzer - generates stats.html after build
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
      }) as any,
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.avif', '**/*.mp4', '**/*.webm'],
    build: {
      // Code splitting configuration
      rollupOptions: {
        output: {
          manualChunks: {
            // Core vendor chunk - React and essential libraries
            'vendor-react': ['react', 'react-dom', 'react/jsx-runtime'],
            
            // Animation libraries - framer-motion is large
            'vendor-animation': ['framer-motion'],
            
            // Icons library
            'vendor-icons': ['lucide-react'],
            
            // Core components that are always loaded (above the fold)
            'core-components': [
              './components/Header.tsx',
              './components/Hero.tsx',
              './components/CursorTrail.tsx',
              './context/ThemeContext.tsx',
            ],
          },
          // Naming pattern for chunks
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
      // Enable source maps for debugging (disable in production)
      sourcemap: mode === 'development',
      // Minify options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    },
  };
});
