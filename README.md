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

The api URL is `runtimeConfig.public.apiBase` (`useRuntimeConfig().public.apiBase`).
It defaults to `http://localhost:8080` (realestate-api running locally); override it with
`NUXT_PUBLIC_API_BASE=...`.

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
