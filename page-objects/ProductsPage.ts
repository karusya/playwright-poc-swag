import { expect, Locator, Page } from '@playwright/test'

import BasePage from '../page-objects/BasePage'

export class ProductsPage extends BasePage {
  readonly signInButton: Locator
  readonly searchButton: Locator
  readonly Button: Locator
  readonly usernameDropdown: Locator
  readonly addToCartButtonLocator: Locator
  readonly goBackButtonLocator: Locator
  readonly allProductsLocator: Locator
  readonly allPricesLocator: Locator

  constructor(page: Page) {
    super(page)
    this.addToCartButtonLocator = page.locator(
      '//button[contains(.,"Add to cart")]'
    )
    this.goBackButtonLocator = page.locator('#back-to-products')

    this.allProductsLocator = page.locator('div.inventory_item_name')
    this.allPricesLocator = page.locator('div.inventory_item_price')
  }

  async visit() {
    await this.page.goto('')
  }

  async addToCart() {
    await this.addToCartButtonLocator.waitFor({ state: 'visible' })
    await this.addToCartButtonLocator.click()
  }
  async goBack() {
    await this.goBackButtonLocator.waitFor({ state: 'visible' })
    await this.goBackButtonLocator.click()
  }

  async getAllProductNames() {
    const allProducts = await this.allProductsLocator.allInnerTexts()
    return allProducts
  }

  async getAllProductPrices() {
    const mergeDedupe = (arr) => {
      return [...new Set([].concat(...arr))]
    }
    const allPrices = await this.allPricesLocator.allInnerTexts()
    const newPricesArray = allPrices.map(function (element) {
      return element.split('$').flat(1)
    })
    console.log(mergeDedupe(newPricesArray))
    return mergeDedupe(newPricesArray)
  }

  async getMinPrice() {
    const allPrices = await this.getAllProductPrices()
    return Math.min(...allPrices)
  }

  async getMaxPrice() {
    const allPrices = await this.getAllProductPrices()
    return Math.max(...allPrices)
  }
}
