## NBA Statistics Test Suite

This project contains automated tests for NBA statistics functionality.

## Installation

```bash
# Clone the repository

# Navigate to the project directory
cd nbastatistics

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test dallas-players-three-point-average.spec.ts

# Run tests with UI mode
npx playwright test --ui

# Generate and view test report
npx playwright show-report
```
