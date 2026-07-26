/// <reference types="astro/client" />

type ENV = {
  HYPERDRIVE: Hyperdrive;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {
    visitorId: string;
  }
}
