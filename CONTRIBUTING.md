# Contributing to pinka.finance

Thanks for your interest in contributing! pinka is open source and we welcome contributions from anyone — whether it's bug reports, design feedback, code, or documentation.

## Getting Started

1. Fork the repository
2. Create a feature branch from `main` using a descriptive name
3. Make your changes
4. Run linters and tests locally before pushing
5. Open a pull request with a clear description

## Branch Naming

- `feat/short-description` — new features
- `fix/short-description` — bug fixes
- `docs/short-description` — documentation only
- `chore/short-description` — tooling, dependencies, refactors with no behavior change
- `refactor/short-description` — refactoring with no behavior change

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add segmented waitlist form`
- `fix: correct OG image dimensions`
- `docs: update README deployment guide`
- `chore: bump dependencies`
- `refactor: extract Hero into its own component`

Keep the subject line under 72 characters. Add a body when context is needed.

## Pull Requests

- Reference any related issues in the description (`Closes #12`)
- Include screenshots or screen recordings for UI changes
- Ensure CI passes before requesting review
- Keep PRs focused — one change per PR is easier to review

## Code Style

Code style is enforced by automated tooling once the application is in place. Briefly:

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting
- Tailwind utility classes preferred over custom CSS

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Questions?

Open a discussion or email [hello@pinka.finance](mailto:hello@pinka.finance).
