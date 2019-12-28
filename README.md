## Coinbarn wallet

Coinbarn is an application designed to interact with [Ergo platform](https://ergoplatform.org) blockchain.

With Coinbarn, you can manage multiple Ergo accounts, send, receive, and issue assets on Ergo blockchain, also view the corresponding activity logs.

Sensitive information like your backup phrase and private keys are never stored anywhere but your device. It is encrypted by your password to provide additional security: only you control them.

## Building locally

- Install [Node.js](https://nodejs.org)
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Install dependencies: `yarn install`
- Build the project as browser extension to the `./build/` folder with `yarn build`.
- In order to build the project as standalone executable in `./dist/` folder, run `yarn electron-pack`
- Optionally, to start a development build (e.g. with logging and file watching) run `yarn start` instead.

## Running developer build in Chrome browser

1. Build according to the previous section or download the latest releases from [Github](https://github.com/coinbarn/coinbarn-extension/releases)
2. Unpack zip archive
3. In your browser go to chrome://extensions/ and switch to `Developer mode`
4. Click `Load unpacked` and refer to a folder from step 2
