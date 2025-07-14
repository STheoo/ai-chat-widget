import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({ rollupTypes: true, tsconfigPath: resolve(__dirname, "tsconfig.lib.json") }), tsconfigPaths(), libInjectCss()],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            name: "ai-chat-widget",
            fileName: "ai-chat-widget",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
    },
});
