# AgentQ CI/CD Demo

Minimal Playwright project showing AgentQ test-result reporting from GitHub Actions using **API key auth only** — no `AGENTQ_EMAIL` / `AGENTQ_PASSWORD` required.

## How it works

Tests import `test` from [`agentq-playwright`](https://www.npmjs.com/package/agentq-playwright). Each test title starts with a numeric AgentQ test case ID (e.g. `1-Login with valid credentials`). After each test, the library:

1. PATCHes the matching test result (by tcId) in the test run `AGENTQ_TESTRUN_ID`, authenticated with the `X-API-Key` header from `AGENTQ_API_KEY`.
2. Uploads the screenshot and video captured by Playwright to that test result.

## Setup

### 1. AgentQ prerequisites

- A project and a test run in [AgentQ](https://agentq.id) containing test cases whose tcIds match the prefixes in `tests/demo.spec.ts` (default: `1` and `2` — rename the prefixes to your tcIds).
- Your company API key, from your account profile.

### 2. GitHub repository configuration

Under **Settings → Secrets and variables → Actions**:

| Where | Name | Value |
|---|---|---|
| Secrets | `AGENTQ_API_KEY` | your AgentQ API key |
| Variables | `AGENTQ_PROJECT_ID` | your project ID |
| Variables | `AGENTQ_TESTRUN_ID` | default test run ID |

The workflow (`.github/workflows/agentq-e2e.yml`) runs on push to `main`, on pull requests, and manually via **Run workflow** (where you can override the test run ID per run).

### 3. Run locally (optional)

```bash
npm install
npx playwright install chromium
cp .env.example .env   # fill in your values
npx playwright test
```

> The library reads `.env` automatically. `AGENTQ_API_KEY` is required — without any credentials the run aborts at authentication.
