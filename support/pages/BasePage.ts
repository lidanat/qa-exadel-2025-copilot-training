/**
 * Base Page Object - Contains common functionality for all pages
 */
export abstract class BasePage {
  protected abstract url: string
  protected abstract pageTitle: string

  /**
   * Visit the page
   */
  visit(): void {
    cy.visit(this.url)
    this.waitForPageLoad()
  }

  /**
   * Wait for page to load completely
   */
  waitForPageLoad(): void {
    cy.url().should('include', this.url)
    cy.title().should('contain', this.pageTitle)
  }

  /**
   * Get page title
   */
  getTitle(): Cypress.Chainable<string> {
    return cy.title()
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): Cypress.Chainable<string> {
    return cy.url()
  }

  /**
   * Click element by selector
   */
  click(selector: string): void {
    cy.get(selector).should('be.visible').click()
  }

  /**
   * Type text into element
   */
  type(selector: string, text: string): void {
    cy.get(selector).should('be.visible').clear().type(text)
  }

  /**
   * Get element text
   */
  getText(selector: string): Cypress.Chainable<string> {
    return cy.get(selector).invoke('text')
  }

  /**
   * Check if element is visible
   */
  isVisible(selector: string): Cypress.Chainable<boolean> {
    return cy.get(selector).should('be.visible').then(() => true)
  }

  /**
   * Wait for element to be visible
   */
  waitForElement(selector: string, timeout: number = 10000): void {
    cy.get(selector, { timeout }).should('be.visible')
  }

  /**
   * Scroll to element
   */
  scrollToElement(selector: string): void {
    cy.get(selector).scrollIntoView()
  }

  /**
   * Take screenshot
   */
  takeScreenshot(filename?: string): void {
    if (filename) {
      cy.screenshot(filename)
    } else {
      cy.screenshot()
    }
  }
}