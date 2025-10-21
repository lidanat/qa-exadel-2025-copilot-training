// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to select elements by data-cy attribute
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`)
})

// Custom command for login
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=login-button]').click()
    cy.url().should('not.include', '/login')
  })
})

// Example of overwriting an existing command
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
//   // Add custom logic before visiting
//   return originalFn(url, options)
// })