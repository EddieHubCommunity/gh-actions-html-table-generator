<h3 align="center">README Box</h3>
<p align="center">Lil' helper for replacing a section of the contents of a README.<p>
<p align="center"><a href="https://npmjs.com/package/readme-box"><img src="https://badgen.net/npm/v/readme-box" alt="NPM"></a> <img alt="CI" src="https://github.com/JasonEtco/readme-box/workflows/CI/badge.svg" /> <a href="https://codecov.io/gh/JasonEtco/readme-box/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/readme-box" alt="Codecov"></a></p>

## Usage

### Installation

```sh
$ npm install readme-box
```

```js
const { ReadmeBox } = require('readme-box')
import { ReadmeBox } from 'readme-box'
```

You can quickly update a section of a README:

```js
await ReadmeBox.updateSection('New contents!', {
  owner: 'JasonEtco',
  repo: 'example',
  token: process.env.GITHUB_TOKEN,
  section: 'example-section'
})
```

Or, if you need to access parts of it more granularly, you can use the `ReadmeBox` class methods:

```js
const box = new ReadmeBox({ owner, repo, token })

// Get the contents of the README from the API
const { content, sha } = await box.getReadme()

// Get the contents of a section of the provided string
const sectionContents = box.getSection('example-section', content)

// Return a string with the replaced contents
const replacedContents = box.replaceSection({
  section: 'example-section',
  oldContent,
  newContent
})

// Update the README via the API, with an optional commit message
await box.updateReadme({ content, sha, message: 'Updating the README!' })
```

## How it works

`ReadmeBox.updateSection` combines a couple of the methods exposed on the `ReadmeBox` class, to do the following:

- Get the README file's contents from the API
- Replace a section of it using Regular Expressions
- Update the file via the API

It expects your README to have a "section", using HTML comments:

```html
Check out this README!

<!--START_SECTION:example-section-->
Old contents...
<!--END_SECTION:example-section-->
```

When the above example code is run, everything between the start and end comments will be replaced.

## Local Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx). Below is a list of commands you will probably find useful.

### `npm start`

Runs the project in development/watch mode. The project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab. The library will be rebuilt if you make edits.

### `npm run build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).
s

### `npm test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
