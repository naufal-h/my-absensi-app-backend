[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](https://expressjs.com/)

**Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org).**

**This project has a [Code of Conduct][].**

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![Linux Build][github-actions-ci-image]][github-actions-ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![OpenSSF Scorecard Badge][ossf-scorecard-badge]][ossf-scorecard-visualizer]

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install express
```

Follow [our installing guide](https://expressjs.com/en/starter/installing.html)
for more information.

## Features

- Robust routing
- Focus on high performance
- Super-high test coverage
- HTTP helpers (redirection, caching, etc)
- View system supporting 14+ template engines
- Content negotiation
- Executable for generating applications quickly

## Docs & Community

- [Website and Documentation](https://expressjs.com/) - [[website repo](https://github.com/expressjs/expressjs.com)]
- [GitHub Organization](https://github.com/expressjs) for Official Middleware & Modules
- [Github Discussions](https://github.com/expressjs/discussions) for discussion on the development and usage of Express

**PROTIP** Be sure to read the [migration guide to v5](https://expressjs.com/en/guide/migrating-5)

## Quick Start

The quickest way to get started with express is to utilize the executable [`express(1)`](https://github.com/expressjs/generator) to generate an application as shown below:

Install the executable. The executable's major version will match Express's:

```bash
npm install -g express-generator@4
```

Create the app:

```bash
express /tmp/foo && cd /tmp/foo
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

View the website at: http://localhost:3000

## Philosophy

The Express philosophy is to provide small, robust tooling for HTTP servers, making
it a great solution for single page applications, websites, hybrids, or public
HTTP APIs.

Express does not force you to use any specific ORM or template engine. With support for over
14 template engines via [@ladjs/consolidate](https://github.com/ladjs/consolidate),
you can quickly craft your perfect framework.

## Examples

To view the examples, clone the Express repository:

```bash
git clone https://github.com/expressjs/express.git --depth 1 && cd express
```

Then install the dependencies:

```bash
npm install
```

Then run whichever example you want:

```bash
node examples/content-negotiation
```
