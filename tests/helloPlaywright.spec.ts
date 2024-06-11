import { test, expect } from "@playwright/test";

test("First test", async ({ page }) => {
  // The page is a web page within the browser context. Like a browser tab.

  // PW heavily uses JS async
  // PW code executes now
  // Unlike in Cypress, where the majority of code executes in the browser itself
  // So you can't set breakpoints in IDE for Cypress, you have to use debugger statements, but stepping over does nothing.
  // Cypress commands are executes when they are queued up for later
  // This is why you can't store things in variables easily in Cypress

  // This didn't work ---------------
  // We enqueued this action then ended the test, so the test was completed before the action completed
  // page.goto("https://www.edgeworldstraining.co.uk/webdriver2")

  // Instead we await ---------------------
  await page.goto("https://www.edgeworldstraining.co.uk/webdriver2");

  // This is MUCH cleaner than in Cypress ----------------------
  // This doesn't need awaited because the locator lookup is stored until we call .click() - THEN we call the lookup.
  const search = page.getByPlaceholder("Search Products...");
  await search.click();
  // No deeply nested then statements

  // Question: would we ever want an await before the lookup? E.g. for debugging reasons to see the found element?
  // No: this yields the locator https://playwright.dev/docs/api/class-locator

  // You can close the page if you'd like, but it's not necessary, because PW will reuse an existing browser.
  // This has some benefits for performance since setup and teardown doesn't occur.
  // It will NOT reuse the browser context. So no browser storage, cookies etc.
  await page.close();
});

test("Day 1 homework", async ({page}) => {
  await page.goto("https://www.edgewordstraining.co.uk/demo-site/");

  // To record from an existing test, run the test so far in headed mode and ensure the page doesn't close after the test completes
  // Then place the cursor in tbe test file and clikck "Record at cursor" in the vscode Playwright section.

  // The below was recorded with codegen
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
  await page.getByLabel('Username or email address *').click();
  await page.getByLabel('Username or email address *').fill('test@dayshape.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('dayshapetest');
  await page.locator('#password').press('Enter');
  await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
  await page.getByLabel('Add “Beanie” to your cart').click();
  await page.getByLabel('Add “Hoodie with Zipper” to').click();
  await page.getByLabel('Add “Tshirt” to your cart').click();
  await page.locator('#site-header-cart').getByRole('link', { name: 'View cart ' }).click();
  await page.getByRole('row', { name: 'Remove this item Product: Beanie Price: £18.00 Quantity: Beanie quantity 1 Subtotal: £' }).getByLabel('Remove this item').click();
  await page.getByRole('row', { name: 'Remove this item Product: Hoodie with Zipper Price: £45.00 Quantity: Hoodie' }).getByLabel('Remove this item').click();
  await page.getByLabel('Remove this item').click();
  await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
});