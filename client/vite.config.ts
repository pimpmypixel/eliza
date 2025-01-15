import path from "path";
import fs from 'fs';
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../.env") });

// https://vite.dev/config/
export default defineConfig({
    plugins: [wasm(), topLevelAwait(), react()],
    optimizeDeps: {
        exclude: ["onnxruntime-node", "@anush008/tokenizers"],
    },
    build: {
        commonjsOptions: {
            exclude: ["onnxruntime-node", "@anush008/tokenizers"],
        },
        rollupOptions: {
            external: ["onnxruntime-node", "@anush008/tokenizers"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        // host: true,
        // host: 'aitinerary.redirectme.net',      // Optional: Your domain name
        port: 443,
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, './aitinerary/aitinerary.redirectme.net-key.pem')),
        //     cert: fs.readFileSync(path.resolve(__dirname, './aitinerary/aitinerary.redirectme.net.pem')),
        // },
        //
        host: '0.0.0.0',
        proxy: {
            "/api": {
                target: `http://127.0.0.1:${process.env.SERVER_PORT || 3000}`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
