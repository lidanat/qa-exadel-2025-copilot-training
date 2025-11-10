import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  protected url = '/inventory.html'
  protected pageTitle = 'Swag Labs'

  // Selectors
  private welcomeMessage = '.title'
  private userProfile = '.bm-burger-button'
  private logoutButton = '#logout_sidebar_link'
  private navigationMenu = '.bm-menu'

  /**
   * Get welcome message
   */
  getWelcomeMessage(): Cypress.Chainable<string> {
    return this.getText(this.welcomeMessage)
  }

  /**
   * Click user profile
   */
  clickUserProfile(): void {
    this.click(this.userProfile)
  }

  /**
   * Logout user
   */
  logout(): void {
    this.click(this.userProfile) // Open burger menu first
    this.click(this.logoutButton)
  }

  /**
   * Check if user is logged in
   */
  isUserLoggedIn(): void {
    this.waitForElement(this.welcomeMessage)
    this.waitForElement(this.userProfile)
  }

  /**
   * Navigate using menu
   */
  navigateToSection(section: string): void {
    cy.get(this.navigationMenu).contains(section).click()
  }
}