# Svelte Start Point (SSP)

## Description

This is a template to start a new project with SvelteKit. It includes the following features:

- [x] [SvelteKit](https://kit.svelte.dev/docs/introduction) with [TypeScript](https://www.typescriptlang.org).
- [x] Database connection with [Drizzle ORM](https://orm.drizzle.team/docs/overview). (Pre-configured with SQLite)
- [x] Migrations with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview).
- [x] Session-based authentication and authorization with [Lucia](https://lucia-auth.com).
- [x] OAuth 2.0 and OpenID Connect clients with [Arctic](https://arctic.js.org).
- [x] [Tailwind CSS](https://tailwindcss.com) for styling.
- [x] [ESLint](https://eslint.org) latest flat-config for linting and [Prettier](https://prettier.io) for code formatting.
- [x] [Playwright](https://playwright.dev) for end-to-end testing.

## Getting Started

### Prerequisites

- A package manager of your choice. (e.g. npm, yarn, pnpm or bun)
- Node.js 18.x or later. (Bun also works as it complies with Node.js APIs)

### Installation

1. Clone the repository.

```bash
git clone https://github.com/alejandroperezpujante/svelte-start-point.git
```

2. Install the dependencies.

```bash
cd svelte-start-point
npm install # or (yarn, pnpm, bun) install
```

3. Copy the `.env.example` file to `.env` and fill in the required environment variables.

```bash
cp .env.example .env
```

4. Run the migrations.

```bash
npm run migrations:push # or (yarn, pnpm, bun) run migrations:push
```

5. Start the development server.

```bash
npm run dev # or (yarn, pnpm, bun) run dev
```

6. Open your browser and navigate to `http://localhost:5173`.
