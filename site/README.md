# Website source

The repository root contains the built website served by GitHub Pages. This
directory contains the editable React/Vite source. No GitHub Pages settings,
DNS changes, or server-side application are required for this update.

From the repository root, rebuild and stage the website with:

```sh
npm --prefix site ci
npm --prefix site run build
npm --prefix site run stage
```

Then review the Git diff and commit the source and built output together.
These commands do not commit or push.

To preview only the source:

```sh
npm --prefix site run dev -- --host 127.0.0.1
```

The build generates an `index.html` for every route, including `/privacy/`,
`/terms/`, and `/demo/`. Existing URLs ending in `/index.html` remain supported.
Pages include their content and metadata before JavaScript runs; JavaScript
adds navigation, animation, installation controls, and the demo form.

`src/metadata.json` preserves the original page descriptions, canonical URLs,
social metadata, and legal-page indexing settings. `public/CNAME` preserves
`www.llmsforall.com`. Model hosting at `models.llmsforall.com` is separate.

`.env.production` contains only the public demo API endpoint supplied with the
website. It is embedded in the browser bundle and contains no secret. The API
permits the production domain; submissions from a local preview may be blocked
by its CORS policy. The newsletter form has been removed.

Do not add private credentials or preview experiments to this directory.
