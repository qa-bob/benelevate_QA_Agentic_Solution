/**
 * tests/functional/cta-buttons.spec.ts
 *
 * Functional tests for the primary call-to-action buttons on the
 * BenElevate.com domain listing page: "Buy now" and "Start payment plan".
 * Verifies visibility, valid hrefs, and above-the-fold placement.
 *
 * Tag: @functional
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('CTA Buttons @functional', () => {
  // ── Visibility ───────────────────────────────────────────────────────────────

  test('"Buy now" button is visible @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.buyNowButton).toBeVisible();
  });

  test('"Start payment plan" button is visible @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.paymentPlanButton).toBeVisible();
  });

  test('monthly instalment amount is displayed near the payment plan CTA @functional', async ({
    domainListingPage,
  }) => {
    await expect(domainListingPage.monthlyPriceText).toBeVisible();
  });

  // ── Valid hrefs ──────────────────────────────────────────────────────────────

  test('"Buy now" button links to the shopping cart @functional', async ({ domainListingPage }) => {
    const href = await domainListingPage.buyNowButton.getAttribute('href');
    expect(href, '"Buy now" should have a non-empty href').toBeTruthy();
    expect(
      href!.toLowerCase(),
      '"Buy now" href should point to a cart or checkout endpoint'
    ).toMatch(/cart|checkout|purchase|shopping/i);
  });

  test('"Start payment plan" button links to the payment setup page @functional', async ({
    domainListingPage,
  }) => {
    const href = await domainListingPage.paymentPlanButton.getAttribute('href');
    expect(href, '"Start payment plan" should have a non-empty href').toBeTruthy();
    expect(
      href!.toLowerCase(),
      '"Start payment plan" href should point to a payment or plan setup endpoint'
    ).toMatch(/payment|plan|setup/i);
  });

  // ── Above-the-fold on desktop ────────────────────────────────────────────────

  test('"Buy now" button is visible above the fold at desktop viewport @functional', async ({
    page,
    siteConfig,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Runs only in the "chromium-desktop" project');
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(siteConfig.url, { waitUntil: 'domcontentloaded' });

    const buyNow = page.getByRole('link', { name: /buy now/i }).first();
    await expect(buyNow).toBeVisible();

    const isAboveFold = await buyNow.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });

    expect(
      isAboveFold,
      '"Buy now" button should be visible in the initial viewport without scrolling'
    ).toBeTruthy();
  });

  // ── Both CTAs present together ───────────────────────────────────────────────

  test('both purchase CTAs are present simultaneously @functional', async ({
    domainListingPage,
  }) => {
    const [buyNowVisible, paymentPlanVisible] = await Promise.all([
      domainListingPage.buyNowButton.isVisible(),
      domainListingPage.paymentPlanButton.isVisible(),
    ]);

    expect(buyNowVisible, '"Buy now" should be visible').toBeTruthy();
    expect(paymentPlanVisible, '"Start payment plan" should be visible').toBeTruthy();
  });
});
