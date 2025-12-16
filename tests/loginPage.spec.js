import { test as setup, expect } from '@playwright/test';
import { authenticator } from 'otplib';
import path from 'path';




setup('authenticate', async ({ page }) => {

  const authFile = path.join(__dirname, '../playwright/.auth/user.json');
  const secret = 'ZU3JW764YQZ4FVQVX637ZIV2B3PXBEQP';
  await page.goto('https://stitch.test.tools.bbc.co.uk/');
  await page.getByRole('textbox', { name: 'email' }).fill('pitlar01');
  await page.keyboard.press('Enter');
  await page.getByRole('textbox', { name: 'password' }).fill('xxx');
  await page.keyboard.press('Enter');
 
  const token = authenticator.generate(secret);

  await page.getByLabel('code').fill(token);
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.context().storageState({ path: authFile });
}
);