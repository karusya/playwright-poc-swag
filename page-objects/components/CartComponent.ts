import { Page, Locator, expect } from '@playwright/test'

import BasePage from '../../page-objects/BasePage'

export class CartComponent extends BasePage {
  readonly continueLocator: Locator
  readonly exportButtonLocator: Locator
  readonly includeIndexLocator: Locator
  readonly renameFilesLocator: Locator
  readonly donwloadLocations: Locator


  constructor(page: Page) {
    super(page)
    
    this.includeIndexLocator = this.page.locator(
      '//button[@name="includeBible"]'
    )
    this.renameFilesLocator = this.page.locator(
      '//button[@name="useTitleColumn"]'
    )
  }

  async removeFromCart(str) {
    await this.page
      .locator(
        '//div[contains(.,"' +
          str +
          '")]/../following-sibling::div[@class="item_pricebar"]/button'
      )
      .click()
  }

  async verifyItemPresent(str) {
    await expect(
      this.page.locator(
        '//div[@class="cart_item_label" and contains(.,"' + str + '")]'
      )
    ).toBeVisible()
  }

  async continueShopping() {
    await this.page.locator('//a[contains(.,"Continue Shopping")').click()
  }

  async checkOut() {
    await this.page.locator('#checkout').click()
  }

  async verifyPaymentInfo() {
    await expect(this.page.locator('.summary_info')).toBeVisible()
  }

  async clickFinish() {
    await this.page.locator('#finish').click()
    await expect(
      this.page.locator('#checkout_complete_container')
    ).toBeVisible()
  }

  async gotoAllItems() {
    await this.page.locator('//button[contains(.,"Open Menu")]').click()
    await this.page.locator('#inventory_sidebar_link').click()
  }
}
