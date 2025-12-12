# Contributing to frame-logger

Thank you for your interest in contributing to **frame-logger**.

This project aims to remain lightweight, dependency-free, and focused on clear, deterministic console output for Node.js applications and CI pipelines.


## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/PaulOnyekwelu/frame-logger
cd frame-logger
```

3. Install dependencies:

```bash
npm install
```

4. Run the test suite:

```bash
npm test
```

## Project Principles

When contributing, please keep the following principles in mind:

- Prefer standard Node.js APIs over external dependencies
- Keep changes small and focused
- Avoid introducing breaking changes outside of major versions
- Ensure all behavior changes are covered by tests
- Maintain clear separation between formatting logic and I/O


## Development Workflow

### Running Tests

```bash
npm test
```

### Updating Snapshots

Snapshot tests are used to prevent regressions in formatted output.

```bash
npm run test:update
```

## Code Style

- Use clear, descriptive variable and function names
- Prefer readability over cleverness
- Follow existing file and module structure
- Keep functions small and single-purpose


## Commit Messages

Use concise, descriptive commit messages that explain **why** a change was made.

Examples:

```
frame: add vertical padding support
logger: route warn and error levels to stderr
test: fix alignment edge case
docs: expand README examples
```


## Pull Requests

- Open one pull request per logical change
- Include a clear description of the problem being solved
- Reference related issues where applicable
- Ensure tests pass before requesting review


## Code of Conduct

All contributors are expected to be respectful and professional.

Harassment, discrimination, or abusive behavior will not be tolerated.
