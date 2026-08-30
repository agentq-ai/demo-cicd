import { browser, $, expect } from '@wdio/globals';

// Same tcId prefixes as the Playwright demo — both suites report into the
// same AgentQ test cases, each run adding a new history entry.

describe('SauceDemo login (WebdriverIO)', () => {
  it('1-Login with valid credentials', async () => {
    await browser.url('https://www.saucedemo.com/');
    await $('[data-test="username"]').setValue('standard_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await expect($('.inventory_list')).toBeDisplayed();
  });

  it('2-Login with locked out user shows error', async () => {
    await browser.url('https://www.saucedemo.com/');
    await $('[data-test="username"]').setValue('locked_out_user');
    await $('[data-test="password"]').setValue('secret_sauce');
    await $('[data-test="login-button"]').click();
    await expect($('[data-test="error"]')).toHaveText(expect.stringContaining('locked out'));
  });
});
