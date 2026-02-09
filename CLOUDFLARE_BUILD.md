# Cloudflare Pages – Build configuration (harshraj0235/fincal)

This repo **root** is the **SvelteKit** app. Use this in Cloudflare Pages:

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `.svelte-kit/cloudflare` |
| **Root directory** | *(leave empty)* |

No environment variables required. The build runs `vite build` and outputs to `.svelte-kit/cloudflare` (adapter-cloudflare).

---

The **Next.js** app is in the **`next-app/`** folder. To build or run it locally: `cd next-app && npm install && npm run build`.
