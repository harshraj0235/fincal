/// <reference types="vite/client" />

declare module '*.svelte' {
  import type { Component } from 'svelte';
  const component: Component<Record<string, never>> & { element?: typeof HTMLElement };
  export default component;
}
