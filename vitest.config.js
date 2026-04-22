import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    include: ['src/**/*.test.{js,jsx}'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['json-summary', 'json', 'text'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
    },
  },
});
