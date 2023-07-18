import { defineConfig  } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  let proxyURL;

  if (mode === 'development') {
    proxyURL = 'http://localhost:5000';
  } else {
    proxyURL = 'https://tic-tac-toe-h8ml.onrender.com';
  }

  console.log({mode, proxyURL})

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: proxyURL,
          changeOrigin: true
        },
      },
    },
  };
});
