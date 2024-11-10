import { defineConfig } from 'vite';

export default defineConfig({
    root: "./src",
    build: {
        outDir: './dist',  // Output to the 'dist' folder in the root
        rollupOptions: {
            input: './src/my-profile.html'  // Explicitly set the entry point to index.html
        }
    }
});
