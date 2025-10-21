/**
 * Utility functions for Cypress tests
 */

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate random email
 */
export const generateRandomEmail = (): string => {
  return `test.${generateRandomString(8)}@example.com`
}

/**
 * Generate random number within range
 */
export const generateRandomNumber = (min: number = 1, max: number = 100): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Format date for testing
 */
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`
    default:
      return `${year}-${month}-${day}`
  }
}

/**
 * Wait for element to be stable (no animations)
 */
export const waitForStable = (selector: string, timeout: number = 5000): void => {
  cy.get(selector, { timeout }).should('be.visible')
  cy.get(selector).should('not.have.class', 'animate')
  cy.get(selector).should('not.have.class', 'loading')
}

/**
 * Check if element exists without failing test
 */
export const elementExists = (selector: string): Promise<boolean> => {
  return new Promise((resolve) => {
    cy.get('body').then(($body) => {
      resolve($body.find(selector).length > 0)
    })
  })
}