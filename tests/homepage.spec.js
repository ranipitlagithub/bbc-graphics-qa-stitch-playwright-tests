import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://stitch.test.tools.bbc.co.uk/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BBC Login - Log in/);

  // Click the email text box link.
  await page.locator('#email').click();
  await page.locator('#email').fill('graphicstestuser@bbc.co.uk');
  await page.locator('#password').click();
  await page.locator('#password').fill('E3@pq8ud');
  await page.getByRole('button', { name: 'Log in' }).click();
//await page.locator('//button').click();
 // await page.getByRole('id', { name: 'email' }).click();

});


   
  // Expects page to have a heading with the name of Installation.
 // await expect(page.getByRole('heading', { name: 'Enter your email or username' })).toBeVisible();
