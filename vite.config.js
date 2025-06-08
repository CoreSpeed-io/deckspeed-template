import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: false,
    allowedHosts: process.env.DECKSPEED_ALLOWED_HOSTS
      ? process.env.DECKSPEED_ALLOWED_HOSTS.split(",")
      : [],
  },
  plugins: [viteReact(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
