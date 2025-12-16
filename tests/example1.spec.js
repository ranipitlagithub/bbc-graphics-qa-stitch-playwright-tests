import { test, expect } from '@playwright/test';
import { Page } from 'playwright';
import { LoginPage } from '../tests/loginPage.spec';


  test('homepage tests', async ({ page }) => {
  
  // await expect(page.locator('h1')).toContainText('Homepage');
  await page.locator('section').filter({ hasText: '00:48:00SHORT: Watch: Four' }).getByRole('button').click();
  await expect(page.locator('#app')).toContainText('Less info');
  await page.getByRole('button', { name: 'Less info' }).click();
  await page.getByRole('button', { name: 'Reveal user menu' }).click();
  await expect(page.locator('#app')).toContainText('User Management');
  await expect(page.locator('#app')).toContainText('Logout');
  await page.getByRole('button', { name: 'Reveal user menu' }).click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await expect(page.getByRole('contentinfo')).toContainText('User guide');
  await expect(page.getByRole('contentinfo')).toContainText('Contact');
  await expect(page.getByRole('contentinfo')).toContainText('Monitor exports');
  await page.getByRole('button', { name: 'Save' }).click();

 
});