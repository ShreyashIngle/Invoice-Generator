import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point for your application
      },
    },
  },
  server: {
    // port: 3000, // You can change this to your preferred port
    open: true, // Automatically open the app in the browser on server start
    // Proxy configuration (optional)
    // Uncomment this section if you need to proxy requests to your backend server
    proxy: {
      '/api': {
        target: 'https://invoice-generator-kz6p.onrender.com', // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust path if needed
      },
    },
  },
});
