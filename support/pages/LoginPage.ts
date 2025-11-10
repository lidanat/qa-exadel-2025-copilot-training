import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  protected url = '/'
  protected pageTitle = 'Swag Labs'

  // Selectors
  private usernameInput = '#user-name'
  private passwordInput = '#password'
  private loginButton = '#login-button'
  private errorMessage = '[data-test="error"]'
  private forgotPasswordLink = '[data-cy=forgot-password]'

  /**
   * Enter username
   */
  enterUsername(username: string): void {
    this.type(this.usernameInput, username)
  }

  /**
   * Enter password
   */
  enterPassword(password: string): void {
    this.type(this.passwordInput, password)
  }

  /**
   * Click login button
   */
  clickLogin(): void {
    this.click(this.loginButton)
  }

  /**
   * Perform login with credentials
   */
  login(username: string, password: string): void {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
  }

  /**
   * Get error message text
   */
  getErrorMessage(): Cypress.Chainable<string> {
    return this.getText(this.errorMessage)
  }

  /**
   * Click forgot password link
   */
  clickForgotPassword(): void {
    this.click(this.forgotPasswordLink)
  }

  /**
   * Check if login form is visible
   */
  isLoginFormVisible(): void {
    this.waitForElement(this.usernameInput)
    this.waitForElement(this.passwordInput)
    this.waitForElement(this.loginButton)
  }
}