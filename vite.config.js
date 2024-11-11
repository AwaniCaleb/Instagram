import { defineConfig } from 'vite';

export default defineConfig({
    base: '/Instagram/',         // Required for GitHub Pages
    publicDir: 'public',         // Set public directory
    build: {
        outDir: 'dist',            // Output directory
        rollupOptions: {
            input: {
                main: './public/index.html',
                profile: './public/my-profile.html',  // Include any other additional pages here
            },
        },
    },
});
