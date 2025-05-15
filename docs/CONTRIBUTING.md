# Contributing

All workflows in the SDK use the [bun runtime](https://bun.sh/).

## Guidelines

Opening an issue to address your concern is recommended. However, if you plan to submit a pull request (PR), please adhere to the following:

 1. **Align with the Repo Structure**: Organize canonical functionality within the appropriate folders. Provide clear documentation and usage annotations in the base class structures.

 2. **Pass All Unit Tests**: Ensure all `bun` unit tests pass and maintain near full code coverage.

 3. **Provide a Detailed PR Description**: Clearly outline the changes made and the specific issues they resolve in your pull request.

## Workflow

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

# Verify and test the package externally with npm pack
npm pack

mkdir ../test
cd ../test
bun init
npm install ../...tar.gz
# ... Write test workflows
bun run index.ts
```
