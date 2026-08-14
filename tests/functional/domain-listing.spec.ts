/**
 * tests/functional/domain-listing.spec.ts
 *
 * Functional tests for the BenElevate.com domain listing page.
 * benelevate.com currently redirects to a HugeDomains for-sale page.
 * These tests verify the page structure, pricing, trust signals, and metadata.
 *
 * Tag: @functional
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Domain Listing — Content & Structure @functional', () => {
  // ── Heading ─────────────────────────────────────────────────────────────────

  test('domain name is shown as the primary heading @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.domainHeading).toBeVisible();
    const headingText = await domainListingPage.domainHeading.textContent();
    expect(headingText?.toLowerCase(), 'H1 should contain the domain name').toContain('benelevate');
  });

  // ── Pricing ─────────────────────────────────────────────────────────────────

  test('domain is listed as for sale @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.forSaleText).toBeVisible();
  });

  test('asking price is displayed on the page @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.domainPrice).toBeVisible();
  });

  test('monthly payment option is shown alongside lump-sum price @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.monthlyPriceText).toBeVisible();
  });

  // ── Trust signals ────────────────────────────────────────────────────────────

  test('"Our promise to you" section is present @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.promiseSection).toBeVisible();
  });

  test('30-day money-back guarantee is displayed @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.moneyBackGuarantee).toBeVisible();
  });

  test('quick/immediate delivery promise is displayed @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.quickDelivery).toBeVisible();
  });

  test('safe and secure shopping trust signal is displayed @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.secureShopping).toBeVisible();
  });

  // ── Quick stats ──────────────────────────────────────────────────────────────

  test('quick stats section shows domain metadata @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.quickStatsSection).toBeVisible();
  });

  // ── Contact ──────────────────────────────────────────────────────────────────

  test('phone number link (tel:) is present on the page @functional', async ({ domainListingPage }) => {
    const count = await domainListingPage.phoneLink.count();
    expect(count, 'At least one tel: link should be present').toBeGreaterThan(0);
  });

  test('phone number is non-empty @functional', async ({ domainListingPage }) => {
    const phoneNumber = await domainListingPage.getPhoneNumber();
    expect(phoneNumber.trim(), 'Phone number extracted from tel: link should not be empty').not.toBe('');
  });

  // ── Footer ────────────────────────────────────────────────────────────────────

  test('footer is present @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.footer).toBeVisible();
  });

  test('footer contains HugeDomains branding / copyright @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.copyrightText).toBeVisible();
  });
});
