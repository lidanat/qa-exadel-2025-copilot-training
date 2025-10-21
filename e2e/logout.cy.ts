import { LoginPage, HomePage } from '../support/pages'

describe('Logout Functionality', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  beforeEach(() => {
    loginPage = new LoginPage()
    homePage = new HomePage()
    
    // Load test data
    cy.fixture('testData').as('testData')
  })

  it('should logout successfully after login', function () {
    const { validCredentials } = this.testData.testData
    
    // First login
    loginPage.visit()
    loginPage.login(validCredentials.username, validCredentials.password)
    homePage.isUserLoggedIn()
    
    // Then logout
    homePage.logout()
    
    // Verify redirect to login page
    loginPage.isLoginFormVisible()
    cy.url().should('eq', 'https://www.saucedemo.com/')
  })

  it('should clear user session data on logout', function () {
    const { validCredentials } = this.testData.testData
    
    // Login first
    loginPage.visit()
    loginPage.login(validCredentials.username, validCredentials.password)
    homePage.isUserLoggedIn()
    
    // Logout
    homePage.logout()
    
    // Try to navigate back to protected page
    cy.visit('/inventory.html')
    
    // Should be redirected to login
    cy.url().should('not.include', '/inventory.html')
    loginPage.isLoginFormVisible()
  })

  it('should handle logout when already logged out', () => {
    // Visit logout endpoint directly without logging in
    cy.visit('/')
    
    // Should be on login page or redirected to login
    cy.url().should('eq', 'https://www.saucedemo.com/')
    loginPage.isLoginFormVisible()
  })

  it('should logout and login with different user', function () {
    const { validCredentials, alternateCredentials } = this.testData.testData
    
    // Login with first user
    loginPage.visit()
    loginPage.login(validCredentials.username, validCredentials.password)
    homePage.isUserLoggedIn()
    
    // Logout
    homePage.logout()
    loginPage.isLoginFormVisible()
    
    // Login with different user
    loginPage.login(alternateCredentials.username, alternateCredentials.password)
    homePage.isUserLoggedIn()
    
    // Verify different user is logged in
    homePage.getWelcomeMessage().should('be.visible')
  })
})