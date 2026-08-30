import { initAgentQ, handleTestConclusion, uploadArtifact } from 'agentq-webdriverio';
import { browser } from '@wdio/globals';
import fs from 'fs';
import path from 'path';

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./wdio-tests/**/*.spec.ts'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800'],
      },
    },
  ],
  logLevel: 'warn',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60_000,
  },

  before: function () {
    initAgentQ(browser);
  },

  // Report each result to AgentQ (matched by the numeric tcId prefix of the
  // test title) and attach a screenshot. Auth comes from AGENTQ_API_KEY;
  // AGENTQ_EMAIL optionally names the member shown as "Created By".
  afterTest: async function (test, context, { error, duration, passed }) {
    const testResult = await handleTestConclusion(
      test.title,
      passed ? 'passed' : 'failed',
      Date.now() - duration,
      error?.message
    );

    if (testResult?.id && process.env.AGENTQ_TESTRUN_ID) {
      try {
        const dir = './wdio-results';
        fs.mkdirSync(dir, { recursive: true });
        const screenshotPath = path.join(dir, `screenshot_${test.title.replace(/\s+/g, '-')}.png`);
        await browser.saveScreenshot(screenshotPath);
        await uploadArtifact(process.env.AGENTQ_TESTRUN_ID, testResult.id, 'screenshot', screenshotPath);
      } catch (err: any) {
        console.warn(`[AgentQ] Failed to capture/upload screenshot: ${err.message}`);
      }
    }
  },
};
