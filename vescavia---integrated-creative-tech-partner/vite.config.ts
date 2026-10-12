import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Content-Security-Policy for the production build.
 *
 * Single source of truth: it is injected as a <meta> tag into index.html AND emitted as a
 * `_headers` file (Netlify / Cloudflare Pages) with the extra directives that only work as
 * real HTTP headers (frame-ancestors). If you host elsewhere, copy these values into your
 * host's header configuration.
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "media-src 'self'",
  "connect-src 'self' https://formspree.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "upgrade-insecure-requests",
];

const securityPlugin = (): Plugin => ({
  name: 'vescavia-security',
  apply: 'build',
  transformIndexHtml() {
    // Build-only: a meta CSP in dev would block Vite's HMR styles and websocket.
    return [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP_DIRECTIVES.join('; ') },
        injectTo: 'head-prepend',
      },
    ];
  },
  generateBundle() {
    const headers = [
      '/*',
      `  Content-Security-Policy: ${[...CSP_DIRECTIVES, "frame-ancestors 'none'"].join('; ')}`,
      '  X-Content-Type-Options: nosniff',
      '  X-Frame-Options: DENY',
      '  Referrer-Policy: strict-origin-when-cross-origin',
      '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
      '  Cross-Origin-Opener-Policy: same-origin',
      '  Strict-Transport-Security: max-age=31536000',
      '',
      '/assets/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
    ].join('\n');
    this.emitFile({ type: 'asset', fileName: '_headers', source: headers });
  },
});

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      securityPlugin(),
      // Bundle analyzer is opt-in (`npm run analyze`) so dist/stats.html is never
      // shipped to production, where it would publicly expose the bundle's internals.
      ...(mode === 'analyze'
        ? [
            visualizer({
              open: false,
              gzipSize: true,
              brotliSize: true,
              filename: 'dist/stats.html',
            }) as Plugin,
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
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
      // Source maps only in development builds
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
