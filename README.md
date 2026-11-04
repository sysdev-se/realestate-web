# realestate-web

The realestate website: Nuxt 4 + Nuxt UI, server-side rendered, running on Cloud Run
(`realestate-web` in `realestate-prod-000001`, asia-southeast1).

## Local development

Requires Node 22 (`.nvmrc`; e.g. `nvm use`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, includes type-checking
npm run preview    # run the production build locally
```

Run realestate-api locally too (`ADMIN_PASSWORD=HelloWorld@123 ./mvnw spring-boot:run` in
realestate-api; its CORS default allows `http://localhost:3000`).

The api URL is `runtimeConfig.public.apiBase` (`useRuntimeConfig().public.apiBase`).
It defaults to `http://localhost:8080` (realestate-api running locally); override it with
`NUXT_PUBLIC_API_BASE=...`.

## Pages

| Path | |
|---|---|
| `/` | Home (lorem ipsum for now) |
| `/listings` | All listings: title search, sort, pagination; state in the URL (`?title=&sort=price,desc&page=2`) |
| `/listings/:id` | One listing: image carousel, details; **Delete** for admins |
| `/admin/listings/new` | Create a listing (admins only, browser-rendered): upload images, pick the cover |

Header: **Home**, **Listings** for everyone, **Create Listing** for admins; far right **Sign in**,
or the username with **Sign out** to its right. Signing in stores the api's tokens in
localStorage; the access token is refreshed automatically when it expires.

## Code layout

Standard Nuxt 4 (`app/`), Options API (`defineNuxtComponent`):

- `pages/` only read the route and data, set SEO tags and compose components — no CSS.
- `components/<area>/` hold all markup and styling, auto-imported as `<Area><Name>` (e.g.
  `components/listing/Card.vue` → `<ListingCard>`).
- `plugins/` provide `this.$auth` (session), `this.$api` (realestate-api client) and
  `this.$deviceLayout`.
- `layouts/mobile.vue`, `tablet.vue`, `desktop.vue`, picked by screen width (< 640px, < 1024px,
  ≥ 1024px). The browser remembers its layout in the `device-layout` cookie so the server renders
  the right one; on a first visit the server guesses from the user agent and the browser corrects
  it after loading. Components inside are responsive as well.
- `shared/types/api.ts`: the api's JSON shapes.

## Container

```bash
docker build -t realestate-web .
docker run --rm -p 8080:8080 -e PORT=8080 realestate-web   # http://localhost:8080
```

## Deploy

`.github/workflows/deploy.yml`:

- PR to `main`: `npm ci` + `npm run build`.
- Push to `main`: build the Docker image, push it to
  `asia-southeast1-docker.pkg.dev/realestate-prod-000001/containers/realestate-web:<sha>`,
  then `gcloud run deploy realestate-web --image <image>`.

It authenticates via WIF as `deploy-realestate-web`, which can only push images and
deploy this service. Repo secrets: `GCP_WIF_PROVIDER`, `GCP_SERVICE_ACCOUNT`.

The deploy passes **only `--image`**. Env vars (`NUXT_PUBLIC_API_BASE`), scaling,
memory and public access are managed in realestate-infrastructure, and any other
flag would be reverted by its next `terraform apply`.
