import { expect, Locator, Page } from '@playwright/test'
import BasePage from '../page-objects/BasePage'

export class CheckoutPage extends BasePage {
  readonly firstNameLocator: Locator
  readonly lastNameLocator: Locator
  readonly postalCodeLocator: Locator
  readonly continueButtonLocator: Locator
  readonly cancelButtonLocator: Locator

  constructor(page: Page) {
    super(page)
    this.firstNameLocator = page.locator('#first-name')
    this.lastNameLocator = page.locator('#last-name')
    this.postalCodeLocator = page.locator('#postal-code')
    this.continueButtonLocator = page.locator('#continue')
    this.cancelButtonLocator = page.locator('#cancel')
  }

  async fillCheckOutInfo(fname: string, lname: string, zip: string) {
    await this.firstNameLocator.waitFor({ state: 'visible' })
    await this.firstNameLocator.fill(fname)
    await this.lastNameLocator.waitFor({ state: 'visible' })
    await this.lastNameLocator.fill(lname)
    await this.postalCodeLocator.waitFor({ state: 'visible' })
    await this.postalCodeLocator.fill(zip)
    await this.continueButtonLocator.waitFor({ state: 'visible' })
    await this.continueButtonLocator.click()
  }

  async isCheckoutCorrect() {
    const expectedCheckoutText =
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    const expectedCheckoutHeader = 'Thank you for your order!'
    const elementHeader = this.page.locator('.complete-header')
    const elementSubHeader = this.page.locator('.complete-text')
    const elementText = await elementHeader.textContent()
    const elementText2 = await elementSubHeader.textContent()

    return (
      elementText?.includes(expectedCheckoutHeader),
      elementText2?.includes(expectedCheckoutText)
    )
  }

  async cancelCheckOut() {
    await this.cancelButtonLocator.waitFor({ state: 'visible' })
    await this.cancelButtonLocator.click()
  }
}
