import { expect, Locator, Page } from '@playwright/test'

import BasePage from '../page-objects/BasePage'

export class LoginPage extends BasePage {
  readonly errorMessage: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly usernameInput: Locator
  readonly commonErrorLocator: Locator

  constructor(page: Page) {
    super(page)
    this.errorMessage = page.locator('#form-message-general p span span')
    this.passwordInput = page.locator('[data-test="password"]')
    this.submitButton = page.locator('[id="login-button"]')
    this.usernameInput = page.locator('[data-test="username"]')
    this.commonErrorLocator = page.locator('#form-message-username')
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo()
  }
  async doLogin(user: string, pwd: string) {
    const usrInput = this.usernameInput
    await usrInput.waitFor({ state: 'visible' })
    await usrInput.fill(user!)
    const pswrdInput = this.passwordInput
    await pswrdInput.waitFor({ state: 'visible' })
    await pswrdInput.fill(pwd!)
    await this.submitButton.waitFor({ state: 'visible' })
    await this.submitButton.click()
  }
}
