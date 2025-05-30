import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";

function manualChunks(id) {
    if (id.includes('node_modules')) {
        return id.toString().split('node_modules/')[1].split('/')[0].toString();
    }
}

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            '@': '/resources/js'
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: manualChunks
            }
        }
    }
});
