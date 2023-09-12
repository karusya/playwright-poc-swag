# playwright-typescript-poc

# General Description

Test core repo created to demonstrate the usage of Playwright in action along with TypeScript.

# Installation

1. Clone the repo

2. Install NodeJS and NPM
3. Do a `npm install` in the project root

# Running the tests

There are E2E tests for :link: [SAUCE](https://www.saucedemo.com/) separated by a feature. The following node scripts are defined for running the tests:

`test:e2e` to run all E2E suites for all browsers,

`test:e2e:cart` for adding products to the cart,

`test:e2e:sort` for sorting items,

If there would be any test failures, test run artifacts (videos and screenshots) can be found in the `test-results` catalog. Also, after running the regression set, an HTML test report is generated that will look like this:

![alt text](test-results.png)

The report itself will be placed in the `playwright-report` folder. In order to display the report after the local execution you may need to use `npx playwright show-report` command.
