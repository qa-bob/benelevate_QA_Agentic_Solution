/**
 * tests/functional/faq.spec.ts
 *
 * Functional tests for the FAQ / accordion section on the BenElevate.com
 * domain listing page. Verifies heading presence, question count,
 * content relevance, and accordion interaction behaviour.
 *
 * Tag: @functional
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('FAQ Section @functional', () => {
  // ── Presence ────────────────────────────────────────────────────────────────

  test('FAQ heading is visible @functional', async ({ domainListingPage }) => {
    await expect(domainListingPage.faqHeading).toBeVisible();
  });

  test('FAQ section contains at least one question @functional', async ({ domainListingPage }) => {
    const count = await domainListingPage.getFaqCount();
    expect(count, 'FAQ section should contain at least one "How do I" question').toBeGreaterThan(0);
  });

  // ── Content relevance ────────────────────────────────────────────────────────

  test('FAQ questions cover domain-related topics @functional', async ({ domainListingPage }) => {
    const items = await domainListingPage.faqItems.all();
    const texts = await Promise.all(items.map((el) => el.textContent()));
    const combined = texts.join(' ').toLowerCase();

    const hasRelevantTopic =
      combined.includes('transfer') ||
      combined.includes('domain') ||
      combined.includes('payment') ||
      combined.includes('delivery');

    expect(
      hasRelevantTopic,
      'FAQ items should include domain-transfer or payment-related topics'
    ).toBeTruthy();
  });

  // ── Interaction ──────────────────────────────────────────────────────────────

  test('clicking a FAQ item keeps the user on the same site @functional', async ({
    domainListingPage,
    page,
  }) => {
    const initialOrigin = new URL(page.url()).origin;

    await domainListingPage.clickFirstFaqItem();

    const currentOrigin = new URL(page.url()).origin;
    expect(
      currentOrigin,
      'Clicking a FAQ item should not navigate to a different origin'
    ).toBe(initialOrigin);
  });

  test('multiple FAQ items are individually accessible @functional', async ({ domainListingPage }) => {
    const items = await domainListingPage.faqItems.all();

    for (const item of items.slice(0, 3)) {
      await expect(item).toBeVisible();
    }
  });
});
