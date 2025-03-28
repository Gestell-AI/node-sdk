# Gestell Node SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-1.3.0-blue)
[![Coverage Status](https://coveralls.io/repos/github/Gestell-AI/node-sdk/badge.svg?branch=master)](https://coveralls.io/github/Gestell-AI/node-sdk?branch=master)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/7sUmZuDYQ6cd8WbCiCCnfR/VPonbpR7NEQSaXxQngcCGW/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/7sUmZuDYQ6cd8WbCiCCnfR/VPonbpR7NEQSaXxQngcCGW/tree/master)

A fully featured SDK with extensive code completion for interacting with the Gestell Platform. Compatible with both web and server side environments.

![Project Preview](https://github.com/Gestell-AI/node-sdk/blob/master/preview.gif?raw=true)

## Quick Start

First, get an API Key from <https://platform.gestell.ai>. Then install `@gestell/sdk`:

```bash
npm install @gestell/sdk
```

Or...

```bash
bun add @gestell/sdk
```

Second, load the API Key into your terminal session, or, pass it into the SDK:

```bash
# Load it into your terminal session
export GESTELL_API_KEY = "..."
```

```typescript
// Or, load it into the SDK library directly
import { Gestell } from '@gestell/sdk'

export const GESTELL_API_KEY = process.env.GESTELL_API_KEY || '...'
export const gestell = new Gestell({ key: GESTELL_API_KEY })
```

**Gestell will also read and load these environment variables from a `.env` file.**

Finally, start using the Gestell Platform SDK. The SDK can be used both on the client and server side. A public facing app should use it server side only due to the API Key being passed into the SDK and requests:

```typescript
// start.ts
import { Gestell } from '@gestell/sdk'

export const gestell = new Gestell()

export async function start() {
  const response = await gestell.collection.list()
  console.log(response)
}

start()
```

```bash
# Run your workflow
bun run start.ts
```

## Guide

You can review guides on common workflows and use cases for the Gestell Platform by going to <https://gestell.ai/docs>. There is a full guide to create, prompt, search and gather labels and tables at <https://gestell.ai/docs/guide>.

## Contributing

All workflows in the SDK use the [bun runtime](https://bun.sh/).

Opening an issue to address your concern is recommended. However, if you plan to submit a pull request (PR), please adhere to the following:

 1. **Align with the Repo Structure**: Organize canonical functionality within the appropriate folders. Provide clear documentation and usage annotations in the base class structures.

 2. **Pass All Unit Tests**: Ensure all `bun` unit tests pass and maintain near full code coverage.

 3. **Provide a Detailed PR Description**: Clearly outline the changes made and the specific issues they resolve in your pull request.

The workflow is as follows:

```bash
# Compile a new dist
bun run build
# Confirm it works in ESM and CJS Runtimes
bun run dist/esm/src/index.js
node dist/cjs/src/index.js

# Run unit tests
export GESTELL_API_URL="..." # If running on staging or locally
export GESTELL_API_KEY="..."
bun run test
bun run test:submit

# Verify and test the package externally with bun link
bun link

mkdir ../test
cd ../test
bun init
bun link @gestell/sdk
# ... Write test workflows
bun run index.ts
```

## CHANGELOG

Review the [CHANGELOG](./CHANGELOG.md) to see updates and/or improvements to the SDK.
