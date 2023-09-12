import { expect, Locator, Page } from '@playwright/test'
import BasePage from '../page-objects/BasePage'

export class HomePage extends BasePage {
  readonly sortContainerLocator: Locator
  readonly cartContainerLocator: Locator
  readonly menuContainerLocator: Locator
  readonly logoutButtonLocator: Locator

  constructor(page: Page) {
    super(page)

    this.cartContainerLocator = page.locator(
      '//div[@id="shopping_cart_container"]/a'
    )
    this.menuContainerLocator = page.locator(
      '//button[contains(.,"Open Menu")]'
    )
    this.logoutButtonLocator = page.locator('#logout_sidebar_link')
  }

  async selectItem(itemName: string) {
    await this.page
      .locator(
        '//div[@class="inventory_item_name" and contains(.,"' + itemName + '")]'
      )
      .click()
  }

  async openCart() {
    await this.cartContainerLocator.waitFor({ state: 'visible' })
    await this.cartContainerLocator.click()
  }

  async verifyPrice(amount) {
    await expect(
      this.page.locator('(//div[@class="inventory_item_price"])[1]')
    ).toContainText(amount)
  }
  async logout() {
    await this.menuContainerLocator.waitFor({ state: 'visible' })
    await this.menuContainerLocator.click()
    await this.logoutButtonLocator.waitFor({ state: 'visible' })
    await this.logoutButtonLocator.click()
  }
}
