import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://hd-restaurant-be.onrender.com/',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
})

