globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CVYxaPuy.mjs';
import { manifest } from './manifest_DjXdkKf1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/api/personalize.astro.mjs');
const _page5 = () => import('./pages/blog/_slug_.astro.mjs');
const _page6 = () => import('./pages/blog.astro.mjs');
const _page7 = () => import('./pages/contact-us.astro.mjs');
const _page8 = () => import('./pages/faq.astro.mjs');
const _page9 = () => import('./pages/footer/impact.astro.mjs');
const _page10 = () => import('./pages/footer/subscription.astro.mjs');
const _page11 = () => import('./pages/privacy-policy.astro.mjs');
const _page12 = () => import('./pages/refund-policy.astro.mjs');
const _page13 = () => import('./pages/services/_slug_.astro.mjs');
const _page14 = () => import('./pages/services.astro.mjs');
const _page15 = () => import('./pages/termsofuse.astro.mjs');
const _page16 = () => import('./pages/work/_slug_.astro.mjs');
const _page17 = () => import('./pages/work.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/contact.ts", _page3],
    ["src/pages/api/personalize.ts", _page4],
    ["src/pages/blog/[slug].astro", _page5],
    ["src/pages/blog/index.astro", _page6],
    ["src/pages/contact-us.astro", _page7],
    ["src/pages/faq.astro", _page8],
    ["src/pages/footer/impact.astro", _page9],
    ["src/pages/footer/subscription.astro", _page10],
    ["src/pages/privacy-policy.astro", _page11],
    ["src/pages/refund-policy.astro", _page12],
    ["src/pages/services/[slug].astro", _page13],
    ["src/pages/services/index.astro", _page14],
    ["src/pages/termsofuse.astro", _page15],
    ["src/pages/work/[slug].astro", _page16],
    ["src/pages/work/index.astro", _page17],
    ["src/pages/index.astro", _page18]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
