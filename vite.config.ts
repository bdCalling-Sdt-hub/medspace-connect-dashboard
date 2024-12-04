import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '192.168.10.19',
        // host: '195.35.6.13',
        port: 3001,
    },
});
