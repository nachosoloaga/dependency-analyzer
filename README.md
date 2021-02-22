# dependency-analyzer 🔎

## What is dependency-analyzer?

dependency-analyzer 🔎  provides a CLI tool to process a list of websites and log to console information about each one of those websites using web scraping. This information could be:
- All JavaScript dependencies included in each website index HTML.
- The number of occurrences of each JavaScript dependency among all websites.
- Content length of each website in bytes.

The list of websites must be provided in a CSV file with __title__ and __url__ headers.

## Quickstart 😎

### Requisites 

- node (latest LTS [version 14.15.5](https://nodejs.org/en/blog/release/v14.15.5/) is recommended)

### 🚶‍♂️ Step by step 🚶‍♀️

#### Install dependencies
- run `npm install` command to install all the dependencies listed in the package.json

#### CLI Usage
- run `node index.js` to invoke the CLI with one of the following parameters:
  - `--dependencies`: list JavaScript dependencies of each website.
  - `--total-dependencies`: list the number of occurrences of each JavaScript dependency among all websites.
  - `--content-length`: log the content length of each website in bytes.
- Also you can optionally use `--csv-path` to indicate the **absolute** path to a desired CSV. The CSV must contain __title__ and __url__ headers, and a list of websites. In case `--csv-path` is not present, example CSV by default is used.

#### Additional notes
Each website listed in the CSV file could have a HTTP url or a filesystem path. As the tool uses __[puppeteer](https://pptr.dev/)__ to scrap each website HTML and its interface allows both type of URIs, no differences or additional checks are made. 

## Tests ✅
Tests are run using __[Jest](https://jestjs.io/docs/en/cli)__.

Run `npm run test` to run tests.

## Future work? Yes! 👍

Despite the actual version being a functional and complying tool with all initial requirements, there's always space to improve. A few ideas that could very much be integrated in the future are:

- Make the tool globally installable so it can be executed with a `dependency-analyzer` or `da` (for short) command.
- Add [TypeScript](https://www.typescriptlang.org/).
- Add Github Actions to run tests or linters after a push or PR is made, in order to implement CI/CD.



