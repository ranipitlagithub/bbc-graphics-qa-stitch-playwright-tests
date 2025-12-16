import { test as setup, expect } from '@playwright/test';
import { authenticator } from 'otplib';
import path from 'path';




setup('authenticate', async ({ page }) => {

  const authFile = path.join(__dirname, '../playwright/.auth/user.json');
  await page.goto('https://stitch.test.tools.bbc.co.uk/');
  await page.getByRole('textbox', { name: 'email' }).fill(process.env.BBC_LOGIN_USER_EMAIL);
  await page.keyboard.press('Enter');
  await page.getByRole('textbox', { name: 'password' }).fill(process.env.BBC_LOGIN_USER_PASSWORD);
  await page.keyboard.press('Enter');
 
  const token = authenticator.generate(process.env.BBC_LOGIN_OTP_SECRET);

  await page.getByLabel('code').fill(token);
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.context().storageState({ path: authFile });
}
);