import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    // Capture artifacts on every test so AgentQ receives screenshots/videos too
    screenshot: 'on',
    video: 'on',
  },
});
