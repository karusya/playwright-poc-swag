import { Page } from '@playwright/test'
require('dotenv').config()

export default class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }

  protected async navigateTo() {
    await this.page.goto(process.env.APP_URL!)
  }
}
