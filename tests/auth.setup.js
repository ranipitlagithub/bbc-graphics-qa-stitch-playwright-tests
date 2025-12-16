import { test as setup, expect } from '@playwright/test';
import { authenticator } from 'otplib';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'email' }).fill(process.env.BBC_LOGIN_USER_EMAIL);
  await page.getByRole('textbox', { name: 'password' }).fill(process.env.BBC_LOGIN_USER_PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();

  const token = authenticator.generate(process.env.BBC_LOGIN_OTP_SECRET);
  await page.getByLabel('code').fill(token);
  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait for page redirection.
  await page.waitForURL('/');
  await page.context().storageState({ path: authFile });
});
