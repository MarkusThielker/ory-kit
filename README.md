# ☄️ Ory Template

> [!Warning]  
> This project is work in progress. There is no guarantee that everything will work as it should and breaking changes in the future are possible.

The goal of this project is to create an easy-to-use setup to self-host [Ory Kratos](https://www.ory.sh/kratos) and [Ory Hydra](https://www.ory.sh/hydra).
It will contain an authentication UI, implementing all self-service flows for Ory Kratos and Ory Hydra, as well as an admin UI.
All UI components are written in Svelte and Typescript, and styled using TailwindCSS.

## Getting started

Start the backend services using Docker Compose:

```bash
cp /docker/ory-dev/.env.example /docker/ory-dev/.env
docker compose -f docker/ory-dev/docker-compose.yaml up -d
sh docker/ory-dev/hydra-setup.sh # creates an OAuth2 client (test the consent flow on http://localhost:5555)
```

Then start the authentication UI using npm:

```bash
cd authentication
cp .env.example .env
npm install
npm run dev
```

## Deployment

soon.

## Authentication UI

The authentication UI is already implemented and working. It supports all self-service flows for Ory Kratos and Ory Hydra. It is implemented in a way, that customizing style and page layout is very easy. 

![A browser window showing the sign up page of the authentication UI](./documentation/.img/signup_light.png)

![A browser window showing the settings page of the authentication UI in dark mode](./documentation/.img/settings_dark.png)

### Next steps

The foundation is laid out, but there is still a lot of work to do. The next steps are:
- Add a deployment setup
- Add a sample using the OAuth2 client for authentication
- Improve styling and make layout responsive
- Add support for more languages

## Admin UI

soon.
