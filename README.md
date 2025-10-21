# Cypress Automation Framework

A comprehensive Cypress test automation framework with TypeScript support, Page Object Model, and custom utilities.

## Project Structure

```
cypress/
├── e2e/                    # Test files
│   └── login.cy.ts        # Login functionality tests
├── fixtures/              # Test data files
│   └── testData.json      # Sample test data
├── support/               # Support files and utilities
│   ├── pages/             # Page Object Model classes
│   │   ├── BasePage.ts    # Base page with common functionality
│   │   ├── LoginPage.ts   # Login page object
│   │   ├── HomePage.ts    # Home page object
│   │   └── index.ts       # Page objects barrel export
│   ├── commands.ts        # Custom Cypress commands
│   ├── e2e.ts            # E2E support file
│   └── utils.ts          # Utility functions
├── cypress.config.ts      # Cypress configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Features

- **TypeScript Support**: Full TypeScript integration for better code quality
- **Page Object Model**: Organized page objects for maintainable tests
- **Custom Commands**: Reusable Cypress commands
- **Utility Functions**: Helper functions for common test operations
- **Test Data Management**: JSON fixtures for test data
- **Cross-browser Testing**: Support for Chrome, Firefox, and Edge

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Open Cypress Test Runner:
```bash
npm run cy:open
```

3. Run tests headlessly:
```bash
npm run cy:run
```

## Available Scripts

- `npm run cy:open` - Open Cypress Test Runner
- `npm run cy:run` - Run all tests headlessly
- `npm run cy:run:chrome` - Run tests in Chrome
- `npm run cy:run:firefox` - Run tests in Firefox
- `npm run cy:run:edge` - Run tests in Edge
- `npm run cy:run:headless` - Run tests in headless mode

## Page Object Model

The framework uses the Page Object Model pattern:

### BasePage
Contains common functionality used across all pages:
- Navigation methods
- Element interaction helpers
- Wait utilities
- Screenshot capabilities

### Page-specific Classes
- `LoginPage`: Login functionality
- `HomePage`: Home page interactions

## Custom Commands

### dataCy(value)
Select elements by data-cy attribute:
```typescript
cy.dataCy('login-button').click()
```

### login(username, password)
Custom login command with session management:
```typescript
cy.login('username', 'password')
```

## Utilities

The `utils.ts` file provides helper functions:
- `generateRandomString()` - Generate random strings
- `generateRandomEmail()` - Generate random email addresses
- `generateRandomNumber()` - Generate random numbers
- `formatDate()` - Format dates for testing
- `waitForStable()` - Wait for elements to be stable
- `elementExists()` - Check element existence

## Configuration

The framework is configured in `cypress.config.ts`:
- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Timeouts: 10s default, 30s page load
- Video and screenshot capture enabled

## Writing Tests

Example test structure:
```typescript
import { LoginPage } from '../support/pages'

describe('Feature Tests', () => {
  let loginPage: LoginPage

  beforeEach(() => {
    loginPage = new LoginPage()
    cy.fixture('testData').as('testData')
  })

  it('should perform action', function() {
    loginPage.visit()
    // Test steps...
  })
})
```

## Best Practices

1. Use Page Object Model for better maintainability
2. Utilize data-cy attributes for reliable element selection
3. Keep test data in fixtures
4. Use custom commands for repetitive actions
5. Take screenshots for debugging
6. Use utility functions for dynamic data generation

## Troubleshooting

If you encounter TypeScript errors, ensure:
1. All dependencies are installed: `npm install`
2. TypeScript configuration is correct
3. Cypress types are properly imported

For more information, visit the [Cypress Documentation](https://docs.cypress.io/).