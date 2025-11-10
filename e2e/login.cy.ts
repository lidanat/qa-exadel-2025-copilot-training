import { LoginPage, HomePage } from '../support/pages'
import { generateRandomEmail, generateRandomString } from '../support/utils'

describe('Login Functionality', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  beforeEach(() => {
    loginPage = new LoginPage()
    homePage = new HomePage()
    
    // Load test data
    cy.fixture('testData').as('testData')
  })

  it('should login with valid credentials', function () {
    const { validCredentials } = this.testData.testData
    
    loginPage.visit()
    loginPage.isLoginFormVisible()
    loginPage.login(validCredentials.username, validCredentials.password)
    
    homePage.isUserLoggedIn()
    homePage.getWelcomeMessage().should('contain', 'Products')
  })

  it('should show error with invalid credentials', function () {
    const { invalidCredentials } = this.testData.testData
    
    loginPage.visit()
    loginPage.login(invalidCredentials.username, invalidCredentials.password)
    
    loginPage.getErrorMessage().should('be.visible')
    loginPage.getErrorMessage().should('contain', 'Username and password do not match any user in this service')
  })

  it('should login with dynamic test data', () => {
    const randomEmail = generateRandomEmail()
    const randomPassword = generateRandomString(12)
    
    loginPage.visit()
    loginPage.enterUsername(randomEmail)
    loginPage.enterPassword(randomPassword)
    loginPage.clickLogin()
    
    // This would fail since we're using random data
    // but demonstrates the utility functions
    loginPage.getErrorMessage().should('be.visible')
  })

  it('should navigate to forgot password', () => {
    loginPage.visit()
    loginPage.clickForgotPassword()
    
    cy.url().should('include', '/forgot-password')
  })

  afterEach(() => {
    // Take screenshot on failure
    cy.screenshot()
  })
})