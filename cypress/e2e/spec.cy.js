import ShopPage from '../pages/ShopPage';

describe('Product pricing wholesale and non wholesale test', () => {
  it('wholesale user should successfully login and get the wholesale price', () => {
    // Use command for login (cross-cutting concern)
    cy.login(Cypress.env('WHOLESALE_USERNAME'), Cypress.env('WHOLESALE_PASSWORD'));

    // Use POM for page-specific actions
    ShopPage.navigateAndVerifyShop();
    ShopPage.verifyProduct('Vintage Typewriter', {
      wholesalePrice: 81,
      originalPrice: 90
    });
  })

  it('NON wholesale user should successfully login and doesnt get the wholesale price', () => {
    // Use command for login (cross-cutting concern)
    cy.login(Cypress.env('NON_WHOLESALE_USERNAME'), Cypress.env('NON_WHOLESALE_PASSWORD'));

    // Use POM for page-specific actions
    ShopPage.navigateAndVerifyShop();
    ShopPage.verifyProduct('Vintage Typewriter', {
      hasWholesalePrice: false,
      originalPrice: 90
    });
  })
})