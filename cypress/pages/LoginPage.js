class LoginPage {
  elements = {
    username: () => cy.get('#username'),
    password: () => cy.get('#password'),
    loginBtn: () => cy.get('button[name="login"]')
  }

  fillUsername(username) {
    this.elements.username().type(username)
  }

  fillPassword(password) {
    this.elements.password().type(password)
  }

  clickLogin() {
    this.elements.loginBtn().click()
  }

  login(username, password) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.clickLogin()
  }
}
export default new LoginPage()
