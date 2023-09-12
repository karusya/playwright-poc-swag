import { Page, Locator } from '@playwright/test'
import BasePage from '../../page-objects/BasePage'

export class FilterComponent extends BasePage {
  readonly sortContainerLocator: Locator

  constructor(page: Page) {
    super(page)
    this.sortContainerLocator = page.locator('.product_sort_container')
  }

  async sortItems(order: string) {
    await this.sortContainerLocator.selectOption(order)
  }
}
