// When BUILD_FOR_NEXT=1 we static-export into next-app/public/svelte; otherwise Cloudflare
export const prerender = process.env.BUILD_FOR_NEXT === '1';
