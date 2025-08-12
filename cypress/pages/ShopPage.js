class ShopPage {
  elements = {
    shopLink: () => cy.contains('a', 'Shop'),
    shopHeader: () => cy.contains('h1', 'Shop'),
    wholesalePriceContainer: () => cy.get('.wholesale_price_container'),
    originalComputedPrice: () => cy.get('.original-computed-price'),
    regularPrice: () => cy.get('.woocommerce-Price-amount')
  }

  clickShopLink() {
    this.elements.shopLink().click()
  }

  assertShopHeaderVisible() {
    this.elements.shopHeader().should('be.visible')
  }

  // Product card by product name
  productCardByName(productName) {
    return cy.contains('h2.wp-block-post-title a', productName)
      .closest('[data-wp-key^="product-item-"]');
  }

  // Helper methods for price containers
  wholesalePriceContainer(card) {
    return card.get('.wholesale_price_container .woocommerce-Price-amount bdi');
  }

  originalPriceContainer(card) {
    return card.get('.original-computed-price');
  }

  // High-level action for quick usage in tests
  navigateAndVerifyShop() {
    this.clickShopLink()
    this.assertShopHeaderVisible()
  }

  verifyProduct(productName, options = {}) {
    const { wholesalePrice, originalPrice, hasWholesalePrice = true } = options;

    this.productCardByName(productName).within(() => {
      // Check wholesale price
      if (hasWholesalePrice) {
        cy.get('.wholesale_price_container').then(($wholesale) => {
          if ($wholesale.length > 0) {
            this.wholesalePriceContainer(cy.wrap($wholesale))
              .invoke('text')
              .then((priceText) => {
                const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
                expect(price).to.eq(wholesalePrice);
              });
          } else {
            cy.log('No wholesale price found for this product');
          }
        });
      } else {
        cy.get('.wholesale_price_container').should('not.exist');
      }

      // Check original price based on user type
      if (originalPrice) {
        if (hasWholesalePrice) {
          cy.get('.original-computed-price').then(($original) => {
            if ($original.length > 0) {
              this.originalPriceContainer(cy.wrap($original))
                .invoke('text')
                .then((text) => {
                  const priceValue = parseInt(text.replace(/[^\d]/g, ''), 10);
                  expect(priceValue).to.eq(originalPrice);
                });
            } else {
              cy.log('No original price found for this product');
            }
          });
        } else {
          cy.get('.woocommerce-Price-amount')
            .invoke('text')
            .then((text) => {
              const priceValue = parseInt(text.replace(/[^\d]/g, ''), 10);
              expect(priceValue).to.eq(originalPrice);
            });
        }
      }
    });
  }
}

export default new ShopPage()
