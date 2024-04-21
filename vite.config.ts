import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";
import image from '@rollup/plugin-image';
import tsconfigPaths from "vite-tsconfig-paths";


// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "./public",
  base: "/",
  build: {
    // Relative to the root
    outDir: "./build",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames() {
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    image(),
    svgr(),
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: "**/*.{jsx,tsx}",
    }),
    EnvironmentPlugin("all"),
  ],
  server: {
    port: 3000,
    open: false,
  },
});
