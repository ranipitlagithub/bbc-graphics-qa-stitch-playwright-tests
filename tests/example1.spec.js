import { test as setup, expect } from '@playwright/test';
import { Page } from 'playwright';
import { authenticator } from 'otplib';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const secret = 'ZU3JW764YQZ4FVQVX637ZIV2B3PXBEQP';
const token = authenticator.generate(secret);

try {
  const isValid = authenticator.check(token, secret);
  } catch (err) {
    console.error(err);
}

//otpauth://totp/BBC%20Login%20CodeSTAGE:rani.pitla@bbc.co.uk?secret=4WWR2M7QHRYRPKYT25FWD2EBZOHYMBDK&issuer=BBC%20Login%20CodeSTAGE
//otpauth://totp/BBC%20Login%20CodeSTAGE:rani.pitla@bbc.co.uk?secret=ZU3JW764YQZ4FVQVX637ZIV2B3PXBEQP&issuer=BBC%20Login%20CodeSTAGE
setup('authenticate', async ({ page }) => {
  await page.goto('https://stitch.test.tools.bbc.co.uk/');
  await page.getByRole('textbox', { name: 'email' }).fill('pitlar01');
  await page.getByRole('textbox', { name: 'email' }).press('Tab');
  await page.getByRole('textbox', { name: 'password' }).fill('xxxxx');
  await page.getByRole('button', { name: 'Log in' }).click();
 
  await page.getByLabel('code').fill(token);
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('link', { name: ':48:00' }).click();
  await expect(page.locator('#app')).toContainText('Translate');
  await page.getByRole('link', { name: 'Stitch TEST' }).click();

  await page.context().storageState({ path: authFile });
});