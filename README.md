## Coinbarn browser extension

Coinbarn is an application designed to interact with [Ergo platform](https://ergoplatform.org) blockchain via regular browser.

With Coinbarn, you can manage multiple Ergo accounts, send, receive, and issue assets on Ergo blockchain, also view the corresponding activity logs.

Sensitive information like your backup phrase and private keys are never stored anywhere but your device. It is encrypted by your password to provide additional security: only you control them.

## Building locally

- Install [Node.js](https://nodejs.org)
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Install dependencies: `yarn install`
- Build the project to the `./build/` folder with `yarn build`.
- Optionally, to start a development build (e.g. with logging and file watching) run `yarn start` instead.
