import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',               // Root directory of the project
    publicDir: 'public',     // Public folder for static assets
    build: {
        outDir: 'dist',        // Output directory for build files
        rollupOptions: {
            input: './public/index.html', // Specify entry file location
        },
    },
    base: '/Instagram/',     // Base path for GitHub Pages
});
