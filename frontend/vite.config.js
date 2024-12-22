import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: true, // lub 0.0.0.0 w środowisku Docker
        port: 8081,
    },
    base: "/",
});
