import { test, expect } from '../../page-objects/fixtures/pomFixture'
//import { getNewMatterData } from '../../../test-data';

test.describe.serial('Sorting products', () => {
  const lowToHigh = 'Price (low to high)'
  const highToLow = 'Price (high to low)'

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo()
    await loginPage.doLogin(process.env.USER_ID!, process.env.USER_PWD!)
  })

  test.afterEach(async ({ homePage, productsPage }) => {
    await homePage.logout()
  })

  test('Sort items from low to high', async ({
    homePage,
    filterModal,
    productsPage,
  }) => {
    const min = await (await productsPage.getMinPrice()).toString()
    await filterModal.sortItems(lowToHigh)
    await homePage.verifyPrice(min)
  })

  test('Sort items from high to low', async ({
    homePage,
    filterModal,
    productsPage,
  }) => {
    const max = await (await productsPage.getMaxPrice()).toString()
    await filterModal.sortItems(highToLow)
    await homePage.verifyPrice(max)
  })
})
