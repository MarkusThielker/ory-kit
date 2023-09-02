# ☄️ Ory Template

The goal of this project is to create an easy-to-use setup, for self-hosting [Ory Identities](https://www.ory.sh/kratos).
It will contain an authentication UI, implementing all self-service flows, as well as an admin UI.
All UI components will be written in Svelte and Typescript, and styled using TailwindCSS.

## Getting started

Start the backend services using docker-compose:

```bash
docker-compose -f docker/ory-dev/docker-compose.yaml up -d
```

Then start the authentication UI using npm:

```bash
cd authentication
npm install
npm run dev
```

Yet, there is no real deployment setup. The UI nodes only run in dev mode for now.

## Authentication UI

The authentication UI is already working. It supports the default flows for login, registration, verification, recovery, settings and logout. TOTP, WebAuthn and Lookup screts are also activated. But there is still some work to do, for every feature to work.

Adding a dark mode, integrating OIDC and OAuth2 using [Ory Hydra](https://www.ory.sh/hydra/), adding the Hydra consent flow and general improvements are the next steps.

## Admin UI

soon.
