# Gestell Node SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-1.4.0-blue)
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
import Gestell from '@gestell/sdk';
import type { Document } from '@gestell/sdk/types';

const gestell = new Gestell()

const list: Document[] = await gestell.document.list({
  collectionId: ''
})

console.log(list)
```

## Guide

You can review guides on common workflows and use cases for the Gestell Platform by going to <https://gestell.ai/docs>. There is a full guide to create, prompt, search and gather labels and tables at <https://gestell.ai/docs/guide>.

---

Review the [Contributing Guidelines](./docs/CONTRIBUTING.md) to see how to test and contribute features to the SDK.

Review the [CHANGELOG](./docs/CHANGELOG.md) to see updates and/or improvements to the SDK.
