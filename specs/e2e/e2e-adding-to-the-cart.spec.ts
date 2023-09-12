import { test, expect } from '../../page-objects/fixtures/pomFixture'

test.describe.serial('adding products to the cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo()
    await loginPage.doLogin(process.env.USER_ID!, process.env.USER_PWD!)
  })

  test.afterEach(async ({ homePage, productsPage }) => {
    await homePage.logout()
  })

  test('Add several  products to the cart and do checkout', async ({
    homePage,
    productsPage,
    checkoutPage,
    cartModal,
  }) => {
    let products = await productsPage.getAllProductNames()
    await homePage.selectItem(products[2])
    await productsPage.addToCart()
    await homePage.openCart()
    await cartModal.verifyItemPresent(products[2])
    await cartModal.checkOut()
    await checkoutPage.fillCheckOutInfo('firstname', 'lastname', '12345')
    await cartModal.verifyPaymentInfo()
    await cartModal.clickFinish()
    await checkoutPage.isCheckoutCorrect()
  })

  test('Select one product and remove', async ({
    homePage,
    productsPage,
    cartModal,
  }) => {
    let products = await productsPage.getAllProductNames()
    await homePage.selectItem(products[2])
    await productsPage.addToCart()
    await productsPage.goBack()
    await homePage.openCart()
    await cartModal.verifyItemPresent(products[2])
    await cartModal.removeFromCart(products[2])
  })

  test('Select multiple products and remove', async ({
    homePage,
    productsPage,
    cartModal,
  }) => {
    let products = await productsPage.getAllProductNames()
    await homePage.selectItem(products[2])
    await productsPage.addToCart()
    await productsPage.goBack()
    await homePage.selectItem(products[3])
    await productsPage.addToCart()
    await productsPage.goBack()

    await homePage.openCart()
    await cartModal.verifyItemPresent(products[2])
    await cartModal.verifyItemPresent(products[3])
    await cartModal.removeFromCart(products[2])
    await cartModal.removeFromCart(products[3])
  })

  test('Checkout and cancel', async ({
    homePage,
    productsPage,
    cartModal,
    checkoutPage,
  }) => {
    let products = await productsPage.getAllProductNames()
    await homePage.selectItem(products[2])
    await productsPage.addToCart()
    await productsPage.goBack()

    await homePage.openCart()
    await cartModal.verifyItemPresent(products[2])
    await cartModal.checkOut()
    await checkoutPage.cancelCheckOut()
    await cartModal.removeFromCart(products[2])
  })
})
