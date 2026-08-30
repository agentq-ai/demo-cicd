import { test, expect } from 'agentq-playwright';

// The numeric prefix of each test title is the AgentQ test case ID (tcId).
// After the run, agentq-playwright PATCHes the matching test result in the
// test run given by AGENTQ_TESTRUN_ID, authenticated with AGENTQ_API_KEY.
// Rename the prefixes below to tcIds that exist in your test run.

test.describe('SauceDemo login', () => {
  test('1-Login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('2-Login with locked out user shows error', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});
