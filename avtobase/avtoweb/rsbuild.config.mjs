import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    // Rsbuild only inlines PUBLIC_* variables that exist at build time, so an
    // unset one would leave a bare `process.env...` in the bundle and throw
    // "process is not defined" in the browser. Defining it here is always safe.
    define: {
      'process.env.PUBLIC_SERVER_URL': JSON.stringify(
        process.env.PUBLIC_SERVER_URL ?? '',
      ),
    },
  },
  html: {
    title: 'Avtoweb',
    favicon: './public/favicon.ico',
  },
});
