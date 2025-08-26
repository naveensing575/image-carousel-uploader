/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,               // so you can use describe/it/expect
    environment: "jsdom",        // 👈 THIS gives you document/window
    setupFiles: "./src/setupTests.ts",
  },
});
