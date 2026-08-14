import { type Page, type Locator } from '@playwright/test';
import type { SiteConfig } from '@test-types/site-config.types';
import { BasePage } from '@pages/base.page';

export class DomainListingPage extends BasePage {
  // ── Hero / Pricing ──────────────────────────────────────────────────────────
  readonly domainHeading: Locator;
  readonly forSaleText: Locator;
  readonly domainPrice: Locator;
  readonly buyNowButton: Locator;
  readonly paymentPlanButton: Locator;
  readonly monthlyPriceText: Locator;

  // ── Trust / Promise section ─────────────────────────────────────────────────
  readonly promiseSection: Locator;
  readonly moneyBackGuarantee: Locator;
  readonly quickDelivery: Locator;
  readonly secureShopping: Locator;

  // ── FAQ section ─────────────────────────────────────────────────────────────
  readonly faqHeading: Locator;
  readonly faqItems: Locator;

  // ── Quick stats ─────────────────────────────────────────────────────────────
  readonly quickStatsSection: Locator;

  // ── Contact / Footer ────────────────────────────────────────────────────────
  readonly phoneLink: Locator;
  readonly footer: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.domainHeading = page.getByRole('heading', { level: 1 });
    this.forSaleText = page.getByText(/for sale/i).first();
    this.domainPrice = page.getByText(/\$4,295/).first();
    this.buyNowButton = page.getByRole('link', { name: /buy now/i }).first();
    this.paymentPlanButton = page.getByRole('link', { name: /start payment plan/i }).first();
    this.monthlyPriceText = page.getByText(/178\.96/i).first();

    this.promiseSection = page.getByRole('heading', { name: /our promise/i }).first();
    this.moneyBackGuarantee = page.getByText(/30.day money back/i).first();
    this.quickDelivery = page.getByText(/quick delivery|immediate ownership/i).first();
    this.secureShopping = page.getByText(/safe and secure shopping/i).first();

    this.faqHeading = page.getByRole('heading', { name: /faqs?/i }).first();
    this.faqItems = page.locator('a, button').filter({ hasText: /how do i/i });

    this.quickStatsSection = page.getByText(/domain length/i).first();

    this.phoneLink = page.locator('a[href^="tel:"]').first();
    this.footer = page.locator('footer').first();
    this.copyrightText = page.getByText(/HugeDomains/i).first();
  }

  async getFaqCount(): Promise<number> {
    return this.faqItems.count();
  }

  async clickFirstFaqItem(): Promise<void> {
    await this.faqItems.first().click();
    await this.page.waitForTimeout(300);
  }

  async getPhoneNumber(): Promise<string> {
    const href = await this.phoneLink.getAttribute('href');
    return href?.replace('tel:', '') ?? '';
  }
}
