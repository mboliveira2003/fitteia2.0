import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";
import image from '@rollup/plugin-image';
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';

// Get the existing environment variables
const existingEnv = dotenv.config().parsed;

// Function to handle environment variables
function getEnvironmentVariables() {
  // Modify the required environment variables
  const modifiedEnv = {
    'process.env.ProgramFiles_x86': JSON.stringify(process.env['ProgramFiles(x86)']),
    'process.env.CommonProgramFiles_x86': JSON.stringify(process.env['CommonProgramFiles(x86)'])
  };

  // Combine modified and existing environment variables
  return {
    ...existingEnv,
    ...modifiedEnv
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "./public",
  base: "./",
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
    EnvironmentPlugin(getEnvironmentVariables()), // Pass the environment variables to the plugin
  ],
  server: {
    port: 3000,
    open: false,
  },
});
