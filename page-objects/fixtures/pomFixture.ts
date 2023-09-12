import { test as base } from '@playwright/test'
import {
  ProductsPage,
  LoginPage,
  HomePage,
  CheckoutPage,
} from '../../page-objects'
import { CartComponent, FilterComponent } from '../components'

type pages = {
  loginPage: LoginPage
  productsPage: ProductsPage
  cartModal: CartComponent
  homePage: HomePage
  filterModal: FilterComponent
  checkoutPage: CheckoutPage
}

const testPages = base.extend<pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  page: async ({ context }, use) => {
    await use(await context.newPage())
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  cartModal: async ({ page }, use) => {
    await use(new CartComponent(page))
  },
  filterModal: async ({ page }, use) => {
    await use(new FilterComponent(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
})

export const test = testPages
export const expect = testPages.expect
