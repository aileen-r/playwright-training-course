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
