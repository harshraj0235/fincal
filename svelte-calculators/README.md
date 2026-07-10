# MoneyCal Svelte Calculators

SvelteKit app with a **home page** and **calculators** (Income Tax, SIP). Mobile-friendly, ready to deploy.

## Routes

- `/` – Home (hero, quick links, categories)
- `/income-tax-calculator` – Old vs New regime tax calculator
- `/sip-calculator` – SIP returns and year-wise growth

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build & deploy

```bash
npm run build
npm run preview   # test production build locally
```

Deploy the `build` output to Vercel, Netlify, or any Node/static host (adapter-auto picks the right adapter).

## Push from repo root

From the main fincal repo:

```bash
git add svelte-calculators/
git commit -m "Add SvelteKit home + Income Tax & SIP calculators"
git push origin main
```
