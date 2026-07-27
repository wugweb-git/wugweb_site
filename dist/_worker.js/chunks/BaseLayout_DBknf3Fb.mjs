globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, l as renderScript, h as createAstro, p as getDefaultExportFromCjs, v as renderHead, k as renderComponent, w as renderSlot } from './astro/server_DXCcV6JH.mjs';
/* empty css                         */

const $$Astro$2 = createAstro();
const $$SiteHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SiteHeader;
  Astro2.props;
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="site-header" data-astro-cid-ctg3m53h> <nav class="wrap site-header-inner" data-astro-cid-ctg3m53h> <a href="/" class="site-logo" data-astro-cid-ctg3m53h>wugweb</a> <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" data-astro-cid-ctg3m53h> <span data-astro-cid-ctg3m53h></span><span data-astro-cid-ctg3m53h></span><span data-astro-cid-ctg3m53h></span> </button> <div class="site-links" id="nav-menu" data-astro-cid-ctg3m53h> ${navLinks.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} class="nav-link" data-astro-cid-ctg3m53h>${l.label}</a>`)} <a href="/contact-us" class="btn btn-solid mobile-cta" data-astro-cid-ctg3m53h>Let's talk</a> </div> <a href="/contact-us" class="btn btn-solid desktop-cta" data-astro-cid-ctg3m53h>Let's talk</a> </nav> </header>  ${renderScript($$result, "/Users/abcom/Documents/GitHub/wugweb_site/src/components/SiteHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/abcom/Documents/GitHub/wugweb_site/src/components/SiteHeader.astro", void 0);

const $$Astro$1 = createAstro();
const $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SiteFooter;
  const { copyright, companyEmail } = Astro2.props;
  const footerLinks = [
    { href: "/faq", label: "FAQs" },
    { href: "/footer/impact", label: "Impact" },
    { href: "/footer/subscription", label: "Subscription" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/termsofuse", label: "Terms of Use" },
    { href: "/refund-policy", label: "Refund Policy" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-gcn2mc3v> <div class="wrap site-footer-inner" data-astro-cid-gcn2mc3v> <div class="footer-brand" data-astro-cid-gcn2mc3v> <p class="footer-tagline" data-astro-cid-gcn2mc3v>Let's Build Great Experiences Together</p> <p class="footer-email" data-astro-cid-gcn2mc3v> <a${addAttribute(`mailto:${companyEmail || "hello@wugweb.com"}`, "href")} data-astro-cid-gcn2mc3v>${companyEmail || "hello@wugweb.com"}</a> </p> </div> <p class="footer-copy" data-astro-cid-gcn2mc3v>${copyright || "\xA9 2020\u20132026 Wugweb. All rights reserved."}</p> <div class="footer-links" data-astro-cid-gcn2mc3v> ${footerLinks.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} data-astro-cid-gcn2mc3v>${l.label}</a>`)} </div> </div> </footer> `;
}, "/Users/abcom/Documents/GitHub/wugweb_site/src/components/SiteFooter.astro", void 0);

const e=!(typeof navigator>"u")&&"ReactNative"===navigator.product,t={timeout:e?6e4:12e4},r=function(r){const a={...t,..."string"==typeof r?{url:r}:r};if(a.timeout=n$1(a.timeout),a.query){const{url:t,searchParams:r}=function(t){const r=t.indexOf("?");if(-1===r)return {url:t,searchParams:new URLSearchParams};const n=t.slice(0,r),a=t.slice(r+1);if(!e)return {url:n,searchParams:new URLSearchParams(a)};if("function"!=typeof decodeURIComponent)throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");const s=new URLSearchParams;for(const e of a.split("&")){const[t,r]=e.split("=");t&&s.append(o$1(t),o$1(r||""));}return {url:n,searchParams:s}}(a.url);for(const[e,o]of Object.entries(a.query)){if(void 0!==o)if(Array.isArray(o))for(const t of o)r.append(e,t);else r.append(e,o);const n=r.toString();n&&(a.url=`${t}?${n}`);}}return a.method=a.body&&!a.method?"POST":(a.method||"GET").toUpperCase(),a};function o$1(e){return decodeURIComponent(e.replace(/\+/g," "))}function n$1(e){if(false===e||0===e)return  false;if(e.connect||e.socket)return e;const r=Number(e);return isNaN(r)?n$1(t.timeout):{connect:r,socket:r}}const a$2=/^https?:\/\//i,s$2=function(e){if(!a$2.test(e.url))throw new Error(`"${e.url}" is not a valid URL`)};function c$3(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}

const o=["request","response","progress","error","abort"],n=["processOptions","validateOptions","interceptRequest","finalizeOptions","onRequest","onResponse","onError","onReturn","onHeaders"];function s$1(r$1,i){const a=[],u=n.reduce((e,t)=>(e[t]=e[t]||[],e),{processOptions:[r],validateOptions:[s$2]});function c(e){const t="object"==typeof e&&e.callSiteStack?e.callSiteStack:void 0,r=t?void 0:new Error,n=o.reduce((e,t)=>(e[t]=function(){const e=/* @__PURE__ */Object.create(null);let t=0;return {publish:function(t){for(const r in e)e[r](t);},subscribe:function(r){const o=t++;return e[o]=r,function(){delete e[o];}}}}(),e),{}),s=(e=>function(t,r,...o){const n="onError"===t;let s=r;for(let r=0;r<e[t].length&&(s=(0, e[t][r])(s,...o),!n||s);r++);return s})(u),a=s("processOptions",e);s("validateOptions",a);const c={options:a,channels:n,applyMiddleware:s};let l;const h=n.request.subscribe(e=>{l=i(e,(o,i)=>((e,o,i)=>{let a=e,u=o;if(!a)try{u=s("onResponse",o,i);}catch(e){u=null,a=e;}if(a=a&&s("onError",a,i),a){if(a instanceof Error){const e=t?.stack||r?.stack;if("string"==typeof e){const r=e.split("\n").slice(t?1:2);r.length>0&&(a.stack+="\n"+r.join("\n"));}}n.error.publish(a);}else u&&n.response.publish(u);})(o,i,e));});n.abort.subscribe(()=>{h(),l&&l.abort();});const d=s("onReturn",n,c);return d===n&&n.request.publish(c),d}return c.use=function(e){if(!e)throw new Error("Tried to add middleware that resolved to falsey value");if("function"==typeof e)throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");if(e.onReturn&&u.onReturn.length>0)throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");return n.forEach(t=>{e[t]&&u[t].push(e[t]);}),a.push(e),c},c.clone=()=>s$1(a,i),r$1.forEach(c.use),c}var i,a$1,u$2=/* @__PURE__ */c$3(function(){if(a$1)return i;a$1=1;var e=function(e){return e.replace(/^\s+|\s+$/g,"")},t=function(e){return "[object Array]"===Object.prototype.toString.call(e)};return i=function(r){if(!r)return {};for(var o=/* @__PURE__ */Object.create(null),n=e(r).split("\n"),s=0;s<n.length;s++){var i=n[s],a=i.indexOf(":"),u=e(i.slice(0,a)).toLowerCase(),c=e(i.slice(a+1));typeof o[u]>"u"?o[u]=c:t(o[u])?o[u].push(c):o[u]=[o[u],c];}return o}}());let c$2 = class c{onabort;onerror;onreadystatechange;ontimeout;readyState=0;response;responseText="";responseType="";status;statusText;withCredentials;#e;#t;#r;#o={};#n;#s={};#i;open(e,t,r){this.#e=e,this.#t=t,this.#r="",this.readyState=1,this.onreadystatechange?.(),this.#n=void 0;}abort(){this.#n&&this.#n.abort();}getAllResponseHeaders(){return this.#r}setRequestHeader(e,t){this.#o[e]=t;}setInit(e,t=true){this.#s=e,this.#i=t;}send(e){const t="arraybuffer"!==this.responseType,r={...this.#s,method:this.#e,headers:this.#o,body:e};"function"==typeof AbortController&&this.#i&&(this.#n=new AbortController,typeof EventTarget<"u"&&this.#n.signal instanceof EventTarget&&(r.signal=this.#n.signal)),typeof document<"u"&&(r.credentials=this.withCredentials?"include":"omit"),fetch(this.#t,r).then(e=>(e.headers.forEach((e,t)=>{this.#r+=`${t}: ${e}\r\n`;}),this.status=e.status,this.statusText=e.statusText,this.readyState=3,this.onreadystatechange?.(),t?e.text():e.arrayBuffer())).then(e=>{"string"==typeof e?this.responseText=e:this.response=e,this.readyState=4,this.onreadystatechange?.();}).catch(e=>{"AbortError"!==e.name?this.onerror?.(e):this.onabort?.();});}};const l$1="function"==typeof XMLHttpRequest?"xhr":"fetch",h="xhr"===l$1?XMLHttpRequest:c$2,d$1=(e,t)=>{const r=e.options,o=e.applyMiddleware("finalizeOptions",r),n={},s=e.applyMiddleware("interceptRequest",void 0,{adapter:l$1,context:e});if(s){const e=setTimeout(t,0,null,s);return {abort:()=>clearTimeout(e)}}let i=new h;i instanceof c$2&&"object"==typeof o.fetch&&i.setInit(o.fetch,o.useAbortSignal??true);const a=o.headers,d=o.timeout;let p=false,f=false,b=false;if(i.onerror=e=>{m(i instanceof c$2?e instanceof Error?e:new Error(`Request error while attempting to reach ${o.url}`,{cause:e}):new Error(`Request error while attempting to reach is ${o.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:""}`));},i.ontimeout=e=>{m(new Error(`Request timeout while attempting to reach ${o.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:""}`));},i.onabort=()=>{w(true),p=true;},i.onreadystatechange=function(){d&&(w(),n.socket=setTimeout(()=>y("ESOCKETTIMEDOUT"),d.socket)),!p&&i&&4===i.readyState&&0!==i.status&&function(){if(!(p||f||b)){if(0===i.status)return void m(new Error("Unknown XHR error"));w(),f=true,t(null,{body:i.response||(""===i.responseType||"text"===i.responseType?i.responseText:""),url:o.url,method:o.method,headers:u$2(i.getAllResponseHeaders()),statusCode:i.status,statusMessage:i.statusText});}}();},i.open(o.method,o.url,true),i.withCredentials=!!o.withCredentials,a&&i.setRequestHeader)for(const e in a)a.hasOwnProperty(e)&&i.setRequestHeader(e,a[e]);return o.rawBody&&(i.responseType="arraybuffer"),e.applyMiddleware("onRequest",{options:o,adapter:l$1,request:i,context:e}),i.send(o.body||null),d&&(n.connect=setTimeout(()=>y("ETIMEDOUT"),d.connect)),{abort:function(){p=true,i&&i.abort();}};function y(t){b=true,i.abort();const r=new Error("ESOCKETTIMEDOUT"===t?`Socket timed out on request to ${o.url}`:`Connection timed out on request to ${o.url}`);r.code=t,e.channels.error.publish(r);}function w(e){(e||p||i&&i.readyState>=2&&n.connect)&&clearTimeout(n.connect),n.socket&&clearTimeout(n.socket);}function m(e){if(f)return;w(true),f=true,i=null;const r=e||new Error(`Network error while attempting to reach ${o.url}`);r.isNetworkError=true,r.request=o,t(r);}},p$1=(e=[],t=d$1)=>s$1(e,t);

var a, c$1, u$1, l, p, d = { exports: {} }; /* @__PURE__ */ c$3((p || (p = 1, (function(e2, t2) {
  t2.formatArgs = function(t3) {
    if (t3[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t3[0] + (this.useColors ? "%c " : " ") + "+" + e2.exports.humanize(this.diff), !this.useColors) return;
    const s3 = "color: " + this.color;
    t3.splice(1, 0, s3, "color: inherit");
    let n2 = 0, r2 = 0;
    t3[0].replace(/%[a-zA-Z%]/g, (e3) => {
      "%%" !== e3 && (n2++, "%c" === e3 && (r2 = n2));
    }), t3.splice(r2, 0, s3);
  }, t2.save = function(e3) {
    try {
      e3 ? t2.storage.setItem("debug", e3) : t2.storage.removeItem("debug");
    } catch {
    }
  }, t2.load = function() {
    let e3;
    try {
      e3 = t2.storage.getItem("debug") || t2.storage.getItem("DEBUG");
    } catch {
    }
    return !e3 && typeof process < "u" && "env" in process && (e3 = process.env.DEBUG), e3;
  }, t2.useColors = function() {
    if (typeof window < "u" && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return true;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    let e3;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e3[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, t2.storage = (function() {
    try {
      return localStorage;
    } catch {
    }
  })(), t2.destroy = /* @__PURE__ */ (() => {
    let e3 = false;
    return () => {
      e3 || (e3 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t2.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t2.log = console.debug || console.log || (() => {
  }), e2.exports = (l ? u$1 : (l = 1, u$1 = function(e3) {
    function t3(e4) {
      let n3, r2, o2, i2 = null;
      function a2(...e5) {
        if (!a2.enabled) return;
        const s4 = a2, r3 = Number(/* @__PURE__ */ new Date()), o3 = r3 - (n3 || r3);
        s4.diff = o3, s4.prev = n3, s4.curr = r3, n3 = r3, e5[0] = t3.coerce(e5[0]), "string" != typeof e5[0] && e5.unshift("%O");
        let i3 = 0;
        e5[0] = e5[0].replace(/%([a-zA-Z%])/g, (n4, r4) => {
          if ("%%" === n4) return "%";
          i3++;
          const o4 = t3.formatters[r4];
          if ("function" == typeof o4) {
            const t4 = e5[i3];
            n4 = o4.call(s4, t4), e5.splice(i3, 1), i3--;
          }
          return n4;
        }), t3.formatArgs.call(s4, e5), (s4.log || t3.log).apply(s4, e5);
      }
      return a2.namespace = e4, a2.useColors = t3.useColors(), a2.color = t3.selectColor(e4), a2.extend = s3, a2.destroy = t3.destroy, Object.defineProperty(a2, "enabled", { enumerable: true, configurable: false, get: () => null !== i2 ? i2 : (r2 !== t3.namespaces && (r2 = t3.namespaces, o2 = t3.enabled(e4)), o2), set: (e5) => {
        i2 = e5;
      } }), "function" == typeof t3.init && t3.init(a2), a2;
    }
    function s3(e4, s4) {
      const n3 = t3(this.namespace + (typeof s4 > "u" ? ":" : s4) + e4);
      return n3.log = this.log, n3;
    }
    function n2(e4, t4) {
      let s4 = 0, n3 = 0, r2 = -1, o2 = 0;
      for (; s4 < e4.length; ) if (n3 < t4.length && (t4[n3] === e4[s4] || "*" === t4[n3])) "*" === t4[n3] ? (r2 = n3, o2 = s4, n3++) : (s4++, n3++);
      else {
        if (-1 === r2) return false;
        n3 = r2 + 1, o2++, s4 = o2;
      }
      for (; n3 < t4.length && "*" === t4[n3]; ) n3++;
      return n3 === t4.length;
    }
    return t3.debug = t3, t3.default = t3, t3.coerce = function(e4) {
      return e4 instanceof Error ? e4.stack || e4.message : e4;
    }, t3.disable = function() {
      const e4 = [...t3.names, ...t3.skips.map((e5) => "-" + e5)].join(",");
      return t3.enable(""), e4;
    }, t3.enable = function(e4) {
      t3.save(e4), t3.namespaces = e4, t3.names = [], t3.skips = [];
      const s4 = ("string" == typeof e4 ? e4 : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const e5 of s4) "-" === e5[0] ? t3.skips.push(e5.slice(1)) : t3.names.push(e5);
    }, t3.enabled = function(e4) {
      for (const s4 of t3.skips) if (n2(e4, s4)) return false;
      for (const s4 of t3.names) if (n2(e4, s4)) return true;
      return false;
    }, t3.humanize = (function() {
      if (c$1) return a;
      c$1 = 1;
      var e4 = 1e3, t4 = 60 * e4, s4 = 60 * t4, n3 = 24 * s4, r2 = 7 * n3;
      function o2(e5, t5, s5, n4) {
        var r3 = t5 >= 1.5 * s5;
        return Math.round(e5 / s5) + " " + n4 + (r3 ? "s" : "");
      }
      return a = function(i2, a2) {
        a2 = a2 || {};
        var c2, u2, l2 = typeof i2;
        if ("string" === l2 && i2.length > 0) return (function(o3) {
          if (!((o3 = String(o3)).length > 100)) {
            var i3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o3);
            if (i3) {
              var a3 = parseFloat(i3[1]);
              switch ((i3[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return 315576e5 * a3;
                case "weeks":
                case "week":
                case "w":
                  return a3 * r2;
                case "days":
                case "day":
                case "d":
                  return a3 * n3;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return a3 * s4;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return a3 * t4;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return a3 * e4;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return a3;
                default:
                  return;
              }
            }
          }
        })(i2);
        if ("number" === l2 && isFinite(i2)) return a2.long ? (c2 = i2, (u2 = Math.abs(c2)) >= n3 ? o2(c2, u2, n3, "day") : u2 >= s4 ? o2(c2, u2, s4, "hour") : u2 >= t4 ? o2(c2, u2, t4, "minute") : u2 >= e4 ? o2(c2, u2, e4, "second") : c2 + " ms") : (function(r3) {
          var o3 = Math.abs(r3);
          return o3 >= n3 ? Math.round(r3 / n3) + "d" : o3 >= s4 ? Math.round(r3 / s4) + "h" : o3 >= t4 ? Math.round(r3 / t4) + "m" : o3 >= e4 ? Math.round(r3 / e4) + "s" : r3 + "ms";
        })(i2);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i2));
      };
    })(), t3.destroy = function() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }, Object.keys(e3).forEach((s4) => {
      t3[s4] = e3[s4];
    }), t3.names = [], t3.skips = [], t3.formatters = {}, t3.selectColor = function(e4) {
      let s4 = 0;
      for (let t4 = 0; t4 < e4.length; t4++) s4 = (s4 << 5) - s4 + e4.charCodeAt(t4), s4 |= 0;
      return t3.colors[Math.abs(s4) % t3.colors.length];
    }, t3.enable(t3.load()), t3;
  }))(t2);
  const { formatters: s2 } = e2.exports;
  s2.j = function(e3) {
    try {
      return JSON.stringify(e3);
    } catch (e4) {
      return "[UnexpectedJSONParseError]: " + e4.message;
    }
  };
})(d, d.exports)), d.exports));
const F = typeof Buffer > "u" ? () => false : (e2) => Buffer.isBuffer(e2);
function O$1(e2) {
  return "[object Object]" === Object.prototype.toString.call(e2);
}
function j(e2) {
  if (false === O$1(e2)) return false;
  const t2 = e2.constructor;
  if (void 0 === t2) return true;
  const s2 = t2.prototype;
  return !(false === O$1(s2) || false === s2.hasOwnProperty("isPrototypeOf"));
}
const v = ["boolean", "string", "number"];
function x() {
  return { processOptions: (e2) => {
    const t2 = e2.body;
    return !t2 || "function" == typeof t2.pipe || F(t2) || -1 === v.indexOf(typeof t2) && !Array.isArray(t2) && !j(t2) ? e2 : Object.assign({}, e2, { body: JSON.stringify(e2.body), headers: Object.assign({}, e2.headers, { "Content-Type": "application/json" }) });
  } };
}
function E$1(e2) {
  return { onResponse: (s2) => {
    const n2 = s2.headers["content-type"] || "", r2 = e2 && e2.force || -1 !== n2.indexOf("application/json");
    return s2.body && n2 && r2 ? Object.assign({}, s2, { body: t2(s2.body) }) : s2;
  }, processOptions: (e3) => Object.assign({}, e3, { headers: Object.assign({ Accept: "application/json" }, e3.headers) }) };
  function t2(e3) {
    try {
      return JSON.parse(e3);
    } catch (e4) {
      throw e4.message = `Failed to parsed response body as JSON: ${e4.message}`, e4;
    }
  }
}
let R = {};
typeof globalThis < "u" ? R = globalThis : typeof window < "u" ? R = window : typeof global < "u" ? R = global : typeof self < "u" && (R = self);
var q = R;
function A(e2 = {}) {
  const t2 = e2.implementation || q.Observable;
  if (!t2) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  return { onReturn: (e3, s2) => new t2((t3) => (e3.error.subscribe((e4) => t3.error(e4)), e3.progress.subscribe((e4) => t3.next(Object.assign({ type: "progress" }, e4))), e3.response.subscribe((e4) => {
    t3.next(Object.assign({ type: "response" }, e4)), t3.complete();
  }), e3.request.publish(s2), () => e3.abort.publish())) };
}
function S$1() {
  return { onRequest: (e2) => {
    if ("xhr" !== e2.adapter) return;
    const t2 = e2.request, s2 = e2.context;
    function n2(e3) {
      return (t3) => {
        const n3 = t3.lengthComputable ? t3.loaded / t3.total * 100 : -1;
        s2.channels.progress.publish({ stage: e3, percent: n3, total: t3.total, loaded: t3.loaded, lengthComputable: t3.lengthComputable });
      };
    }
    "upload" in t2 && "onprogress" in t2.upload && (t2.upload.onprogress = n2("upload")), "onprogress" in t2 && (t2.onprogress = n2("download"));
  } };
}
var $ = (e2, t2, s2) => ("GET" === s2.method || "HEAD" === s2.method) && (e2.isNetworkError || false);
function _$1(e2) {
  return 100 * Math.pow(2, e2) + 100 * Math.random();
}
const P = (e2 = {}) => ((e3) => {
  const t2 = e3.maxRetries || 5, s2 = e3.retryDelay || _$1, n2 = e3.shouldRetry;
  return { onError: (e4, r2) => {
    const o2 = r2.options, i2 = o2.maxRetries || t2, a2 = o2.retryDelay || s2, c2 = o2.shouldRetry || n2, u2 = o2.attemptNumber || 0;
    if (null !== (l2 = o2.body) && "object" == typeof l2 && "function" == typeof l2.pipe || !c2(e4, u2, o2) || u2 >= i2) return e4;
    var l2;
    const p2 = Object.assign({}, r2, { options: Object.assign({}, o2, { attemptNumber: u2 + 1 }) });
    return setTimeout(() => r2.channels.request.publish(p2), a2(u2)), null;
  } };
})({ shouldRetry: $, ...e2 });
P.shouldRetry = $;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    Promise: undefined};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(function () {
            _this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject));

var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription));

var intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function (handle) {
        return (clearInterval)(handle);
    },
    delegate: undefined,
};

var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });

function isScheduler(value) {
    return value && isFunction(value.schedule);
}

function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process$1(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$1(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator$1;
        executeSchedule(subscriber, scheduler, function () {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator$1.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
}

function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable(init);
}

function isObservable(obj) {
    return !!obj && (obj instanceof Observable || (isFunction(obj.lift) && isFunction(obj.subscribe)));
}

var EmptyError = createErrorClass(function (_super) {
    return function EmptyErrorImpl() {
        _super(this);
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
    };
});

function lastValueFrom(source, config) {
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else {
                    reject(new EmptyError());
                }
            },
        });
    });
}

function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
    return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}

function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        });
    };
}
function maybeSchedule(scheduler, execute, subscription) {
    {
        execute();
    }
}

function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        active++;
        var innerComplete = false;
        innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function (innerValue) {
            {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) ;
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
    };
}

function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
}

function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap(identity, concurrent);
}

function concatAll() {
    return mergeAll(1);
}

function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll()(from(args, popScheduler(args)));
}

function defer(observableFactory) {
    return new Observable(function (subscriber) {
        innerFrom(observableFactory()).subscribe(subscriber);
    });
}

function timer(dueTime, intervalOrScheduler, scheduler) {
    if (scheduler === void 0) { scheduler = async; }
    return new Observable(function (subscriber) {
        var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                {
                    subscriber.complete();
                }
            }
        }, due);
    });
}

function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            EMPTY
        : sources.length === 1
            ?
                innerFrom(sources[0])
            :
                mergeAll(concurrent)(from(sources, scheduler));
}

var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

function catchError(selector) {
    return operate(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
            handledResult = innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}

function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    return resultSelector
        ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector))
        : operate(function (source, subscriber) {
            combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
        });
}

function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}

function finalize(callback) {
    return operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}

function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var bufferSize;
    var refCount = false;
    {
        bufferSize = (configOrBufferSize );
    }
    return share({
        connector: function () { return new ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}

function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity;
}

var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t) {
  let e = JSON.stringify(t);
  return `${u}${Array.from(e).map((r) => {
    let n = r.charCodeAt(0);
    if (n > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);
    return Array.from(n.toString(4).padStart(4, "0")).map((o) => String.fromCodePoint(c[o])).join("");
  }).join("")}`;
}
function I(t) {
  return !Number.isNaN(Number(t)) || /[a-z]/i.test(t) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t) ? false : !!Date.parse(t);
}
function T(t) {
  try {
    new URL(t, t.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return false;
  }
  return true;
}
function C(t, e, r = "auto") {
  return r === true || r === "auto" && (I(t) || T(t)) ? t : `${t}${E(e)}`;
}
Object.fromEntries(Object.entries(c).map((t) => t.reverse()));
Object.fromEntries(Object.entries(s).map((t) => t.reverse()));
var S = `${Object.values(s).map((t) => `\\u{${t.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t) {
  var e;
  return { cleaned: t.replace(f, ""), encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || "" };
}
function O(t) {
  return t && JSON.parse(_(JSON.stringify(t)).cleaned);
}
function stegaClean(result) {
  return O(result);
}

class ClientError extends Error {
  response;
  statusCode = 400;
  responseBody;
  details;
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), Object.assign(this, props);
  }
}
class ServerError extends Error {
  response;
  statusCode = 500;
  responseBody;
  details;
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), Object.assign(this, props);
  }
}
function extractErrorProps(res) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (body.error && body.message)
    return props.message = `${body.error} - ${body.message}`, props;
  if (isMutationError(body) || isActionError(body)) {
    const allItems = body.error.items || [], items = allItems.slice(0, 5).map((item) => item.error?.description).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > 5 && (itemsStr += `
...and ${allItems.length - 5} more`), props.message = `${body.error.description}${itemsStr}`, props.details = body.error, props;
  }
  return body.error && body.error.description ? (props.message = body.error.description, props.details = body.error, props) : (props.message = body.error || body.message || httpErrorMessage(res), props);
}
function isMutationError(body) {
  return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "mutationError" && typeof body.error.description == "string";
}
function isActionError(body) {
  return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "actionError" && typeof body.error.description == "string";
}
function isPlainObject(obj) {
  return typeof obj == "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
  const statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
class CorsOriginError extends Error {
  projectId;
  addOriginUrl;
  constructor({ projectId: projectId2 }) {
    super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId2;
    const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
    if (typeof location < "u") {
      const { origin } = location;
      url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
    } else
      this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
  }
}
const httpError = {
  onResponse: (res) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res);
    return res;
  }
};
function printWarnings() {
  const seen = {};
  return {
    onResponse: (res) => {
      const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [warn];
      for (const msg of warnings)
        !msg || seen[msg] || (seen[msg] = true, console.warn(msg));
      return res;
    }
  };
}
function defineHttpRequest(envMiddleware2) {
  return p$1([
    P({ shouldRetry }),
    ...envMiddleware2,
    printWarnings(),
    x(),
    E$1(),
    S$1(),
    httpError,
    A({ implementation: Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0) return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery2 = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery2) && isRetriableResponse ? true : P.shouldRetry(err, attempt, options);
}
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"], VALID_INSERT_LOCATIONS = ["before", "after", "replace"], dataset$1 = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, projectId$1 = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
}, validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config) => {
  if (!config.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config.dataset || "";
}, requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
}, resourceConfig = (config) => {
  if (!config["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config["~experimental_resource"];
  switch (type) {
    case "dataset": {
      if (id.split(".").length !== 2)
        throw new Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    }
    case "dashboard":
    case "media-library":
    case "canvas":
      return;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
}, resourceGuard = (service, config) => {
  if (config["~experimental_resource"])
    throw new Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => (didCall || (returnValue = fn(...args), didCall = true), returnValue);
}
const createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args) => console.warn(message.join(" "), ...args))
), printCdnAndWithCredentialsWarning = createWarningPrinter([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${generateHelpUrl(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]), printCredentialedTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
  "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
}, LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"], isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
}
const initConfig = (config, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config.stega == "boolean" ? { enabled: config.stega } : config.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname && !newConfig["~experimental_resource"];
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (newConfig["~experimental_resource"] && resourceConfig(newConfig), typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
  newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = false), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId$1(newConfig.projectId), newConfig.dataset && dataset$1(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
class ConnectionFailedError extends Error {
  name = "ConnectionFailedError";
}
class DisconnectError extends Error {
  name = "DisconnectError";
  reason;
  constructor(message, reason, options = {}) {
    super(message, options), this.reason = reason;
  }
}
class ChannelError extends Error {
  name = "ChannelError";
  data;
  constructor(message, data) {
    super(message), this.data = data;
  }
}
class MessageError extends Error {
  name = "MessageError";
  data;
  constructor(message, data, options = {}) {
    super(message, options), this.data = data;
  }
}
class MessageParseError extends Error {
  name = "MessageParseError";
}
const REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return defer(() => {
    const es = initEventSource();
    return isObservable(es) ? es : of(es);
  }).pipe(mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new Observable((observer) => {
    const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
    function onError(evt) {
      if ("data" in evt) {
        const [parseError, event] = parseEvent(evt);
        observer.error(
          parseError ? new MessageParseError("Unable to parse EventSource error message", { cause: event }) : new MessageError((event?.data).message, event)
        );
        return;
      }
      es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({ type: "reconnect" });
    }
    function onOpen() {
      observer.next({ type: "open" });
    }
    function onMessage(message) {
      const [parseError, event] = parseEvent(message);
      if (parseError) {
        observer.error(
          new MessageParseError("Unable to parse EventSource message", { cause: parseError })
        );
        return;
      }
      if (message.type === "channelError") {
        observer.error(new ChannelError(extractErrorMessage(event?.data), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(
          new DisconnectError(
            `Server disconnected client: ${event.data?.reason || "unknown error"}`
          )
        );
        return;
      }
      observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    const cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    const data = typeof message.data == "string" && JSON.parse(message.data);
    return [
      null,
      {
        type: message.type,
        id: message.lastEventId,
        ...isEmptyObject(data) ? {} : { data }
      }
    ];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err) {
  return err.error ? err.error.description ? err.error.description : typeof err.error == "string" ? err.error : JSON.stringify(err.error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
  for (const _ in data)
    return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
  selection;
  operations;
  constructor(selection, operations = {}) {
    this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge2 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
class ObservablePatch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new ObservablePatch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
class Patch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new Patch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
const defaultMutateOptions = { returnDocuments: false };
class BaseTransaction {
  operations;
  trxId;
  constructor(operations = [], transactionId) {
    this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
}
class Transaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new Transaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
class ObservableTransaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new ObservableTransaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config, overrides = {}) {
  const headers = {}, token = overrides.token || config.token;
  token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config.useProjectHostname && config.projectId && (headers[projectHeader] = config.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config.fetch == "object" ? { ...config.fetch, ...overrides.fetch } : overrides.fetch || config.fetch
  });
}
const encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
}), isResponse = (event) => event.type === "response", getBody = (event) => event.body, indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    combineLatestWith(
      from(
        import('./stegaEncodeSourceMap_CEWnIgPX.mjs').then(function(n) {
          return n.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", id),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout, token, tag, headers, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    cacheMode,
    canUseCdn: isQuery2,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    filter(isResponse),
    map(getBody),
    map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
const hasDataConfig = (client) => client.config().dataset !== void 0 && client.config().projectId !== void 0 || client.config()["~experimental_resource"] !== void 0, isQuery = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query")), isMutate = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate")), isDoc = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", "")), isListener = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen")), isHistory = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", "")), isData = (client, uri) => uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _requestObservable(client, httpRequest, options) {
  const uri = options.url || options.uri, config = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn;
  let useCdn = (options.useCdn ?? config.useCdn) && canUseCdn;
  const tag = options.tag && config.requestTagPrefix ? [config.requestTagPrefix, options.tag].join(".") : options.tag || config.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
    const resultSourceMap = options.resultSourceMap ?? config.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspectiveOption = options.perspective || config.perspective;
    typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query }), useCdn && options.cacheMode == "noStale" && (options.query = { cacheMode: "noStale", ...options.query });
  }
  const reqOptions = requestOptions(
    config,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  ), request = new Observable(
    (subscriber) => httpRequest(reqOptions, config.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  return _requestObservable(client, httpRequest, options).pipe(
    filter((event) => event.type === "response"),
    map((event) => event.body)
  );
}
function _getDataUrl(client, operation, path) {
  const config = client.config();
  if (config["~experimental_resource"]) {
    resourceConfig(config);
    const resourceBase = resourceDataBase(config), uri2 = path !== void 0 ? `${operation}/${path}` : operation;
    return `${resourceBase}/${uri2}`.replace(/\/($|\?)/, "$1");
  }
  const catalog = hasDataset(config), baseUri = `/${operation}/${catalog}`;
  return `/data${path !== void 0 ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  if (isDomExceptionSupported)
    return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
  const error = new Error(signal?.reason ?? "The operation was aborted.");
  return error.name = "AbortError", error;
}
const resourceDataBase = (config) => {
  if (!config["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config["~experimental_resource"];
  switch (type) {
    case "dataset": {
      const segments = id.split(".");
      if (segments.length !== 2)
        throw new Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${segments[0]}/datasets/${segments[1]}`;
    }
    case "canvas":
      return `/canvases/${id}`;
    case "media-library":
      return `/media-libraries/${id}`;
    case "dashboard":
      return `/dashboards/${id}`;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
};
class ObservableAssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    return _upload(this.#client, this.#httpRequest, assetType, body, options);
  }
}
class AssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
    return lastValueFrom(
      observable2.pipe(
        filter((event) => event.type === "response"),
        map(
          (event) => event.body.document
        )
      )
    );
  }
}
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const config = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: buildAssetUploadUrl(config, assetType),
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function buildAssetUploadUrl(config, assetType) {
  const assetTypeEndpoint = assetType === "image" ? "images" : "files";
  if (config["~experimental_resource"]) {
    const { type, id } = config["~experimental_resource"];
    switch (type) {
      case "dataset":
        throw new Error(
          "Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead."
        );
      case "canvas":
        return `/canvases/${id}/assets/${assetTypeEndpoint}`;
      case "media-library":
        return `/media-libraries/${id}/upload`;
      case "dashboard":
        return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
      default:
        throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
  }
  const dataset2 = hasDataset(config);
  return `assets/${assetTypeEndpoint}/${dataset2}`;
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = defer(() => import('./browser_CAFSBHvG.mjs')).pipe(
  map(({ default: EventSource2 }) => EventSource2),
  shareReplay(1)
);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(
      catchError((err, caught) => err instanceof ConnectionFailedError ? concat(of({ type: "reconnect" }), timer(1e3).pipe(mergeMap(() => caught))) : throwError(() => err))
    );
  };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "tag"
], defaultOptions = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return throwError(() => new Error("Query too large for listener"));
  const listenFor = options.events ? options.events : ["mutation"], esOptions = {};
  return withCredentials && (esOptions.withCredentials = true), token && (esOptions.headers = {
    Authorization: `Bearer ${token}`
  }), connectEventSource(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2) => new EventSource2(uri, esOptions)))
  ), listenFor).pipe(
    reconnectOnConnectionFailure(),
    filter((event) => listenFor.includes(event.type)),
    map(
      (event) => ({
        type: event.type,
        ..."data" in event ? event.data : {}
      })
    )
  );
}
function shareReplayLatest(configOrPredicate, config) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config } : configOrPredicate
  );
}
function _shareReplayLatest(config) {
  return (source) => {
    let latest, emitted = false;
    const { predicate, ...shareConfig } = config, wrapped = source.pipe(
      tap((value) => {
        config.predicate(value) && (emitted = true, latest = value);
      }),
      finalize(() => {
        emitted = false, latest = void 0;
      }),
      share(shareConfig)
    ), emitLatest = new Observable((subscriber) => {
      emitted && subscriber.next(
        // this cast is safe because of the emitted check which asserts that we got T from the source
        latest
      ), subscriber.complete();
    });
    return merge(wrapped, emitLatest);
  };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
  #client;
  constructor(client) {
    this.#client = client;
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts = false,
    tag: _tag
  } = {}) {
    resourceGuard("live", this.#client.config());
    const {
      projectId: projectId2,
      apiVersion: _apiVersion,
      token,
      withCredentials,
      requestTagPrefix
    } = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    if (includeDrafts && !token && !withCredentials)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
    const esOptions = {};
    includeDrafts && token && (esOptions.headers = {
      Authorization: `Bearer ${token}`
    }), includeDrafts && withCredentials && (esOptions.withCredentials = true);
    const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
    if (existing)
      return existing;
    const events = connectEventSource(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : of(EventSource)).pipe(map((EventSource2) => new EventSource2(url.href, esOptions)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]).pipe(
      reconnectOnConnectionFailure(),
      map((event) => {
        if (event.type === "message") {
          const { data, ...rest } = event;
          return { ...rest, tags: data.tags };
        }
        return event;
      })
    ), checkCors = fetchObservable(url, {
      method: "OPTIONS",
      mode: "cors",
      credentials: esOptions.withCredentials ? "include" : "omit",
      headers: esOptions.headers
    }).pipe(
      mergeMap(() => EMPTY),
      catchError(() => {
        throw new CorsOriginError({ projectId: projectId2 });
      })
    ), observable2 = concat(checkCors, events).pipe(
      finalize(() => eventsCache.delete(key)),
      shareReplayLatest({
        predicate: (event) => event.type === "welcome"
      })
    );
    return eventsCache.set(key, observable2), observable2;
  }
}
function fetchObservable(url, init) {
  return new Observable((observer) => {
    const controller = new AbortController(), signal = controller.signal;
    return fetch(url, { ...init, signal: controller.signal }).then(
      (response) => {
        observer.next(response), observer.complete();
      },
      (err) => {
        signal.aborted || observer.error(err);
      }
    ), () => controller.abort();
  });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(this.#client, this.#httpRequest, "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(this.#client, this.#httpRequest, "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(this.#client, this.#httpRequest, "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(this.#client, this.#httpRequest, {
      uri: "/datasets",
      tag: null
    });
  }
}
class DatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PUT", name, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PATCH", name, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(_modify(this.#client, this.#httpRequest, "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return resourceGuard("dataset", this.#client.config()), lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: "/datasets", tag: null })
    );
  }
}
function _modify(client, httpRequest, method, name, options) {
  return resourceGuard("dataset", client.config()), dataset$1(name), _request(client, httpRequest, {
    method,
    uri: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
class ObservableProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return _request(this.#client, this.#httpRequest, { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` });
  }
}
class ProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return lastValueFrom(_request(this.#client, this.#httpRequest, { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` })
    );
  }
}
class ObservableUsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      this.#client,
      this.#httpRequest,
      { uri: `/users/${id}` }
    );
  }
}
class UsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return lastValueFrom(
      _request(this.#client, this.#httpRequest, {
        uri: `/users/${id}`
      })
    );
  }
}
class ObservableSanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config = defaultConfig) {
    this.config(config), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new ObservableSanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new ObservableSanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      this.#httpRequest,
      this.#clientConfig.stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, this.#httpRequest, id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, this.#httpRequest, ids, options);
  }
  create(document, options) {
    return _create(this, this.#httpRequest, document, "create", options);
  }
  createIfNotExists(document, options) {
    return _createIfNotExists(this, this.#httpRequest, document, options);
  }
  createOrReplace(document, options) {
    return _createOrReplace(this, this.#httpRequest, document, options);
  }
  delete(selection, options) {
    return _delete(this, this.#httpRequest, selection, options);
  }
  mutate(operations, options) {
    return _mutate(this, this.#httpRequest, operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, this.#httpRequest, operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, this.#httpRequest, options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
class SanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */
  observable;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config = defaultConfig) {
    this.config(config), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), this.observable = new ObservableSanityClient(httpRequest, config);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new SanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new SanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return lastValueFrom(
      _fetch(
        this,
        this.#httpRequest,
        this.#clientConfig.stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return lastValueFrom(_getDocument(this, this.#httpRequest, id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return lastValueFrom(_getDocuments(this, this.#httpRequest, ids, options));
  }
  create(document, options) {
    return lastValueFrom(
      _create(this, this.#httpRequest, document, "create", options)
    );
  }
  createIfNotExists(document, options) {
    return lastValueFrom(
      _createIfNotExists(this, this.#httpRequest, document, options)
    );
  }
  createOrReplace(document, options) {
    return lastValueFrom(
      _createOrReplace(this, this.#httpRequest, document, options)
    );
  }
  delete(selection, options) {
    return lastValueFrom(_delete(this, this.#httpRequest, selection, options));
  }
  mutate(operations, options) {
    return lastValueFrom(_mutate(this, this.#httpRequest, operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return lastValueFrom(_action(this, this.#httpRequest, operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return lastValueFrom(_request(this, this.#httpRequest, options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return lastValueFrom(_dataRequest(this, this.#httpRequest, endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
  return { requester: defineHttpRequest(envMiddleware2), createClient: (config) => {
    const clientRequester = defineHttpRequest(envMiddleware2);
    return new ClassConstructor(
      (options, requester2) => (requester2 || clientRequester)({
        maxRedirects: 0,
        maxRetries: config.maxRetries,
        retryDelay: config.retryDelay,
        ...options
      }),
      config
    );
  } };
}
var envMiddleware = [];
const exp = defineCreateClientExports(envMiddleware, SanityClient), createClient = exp.createClient;

var imageUrl_umd$1 = {exports: {}};

var imageUrl_umd = imageUrl_umd$1.exports;

var hasRequiredImageUrl_umd;

function requireImageUrl_umd () {
	if (hasRequiredImageUrl_umd) return imageUrl_umd$1.exports;
	hasRequiredImageUrl_umd = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(imageUrl_umd, (function () {
		  function _arrayLikeToArray(r, a) {
		    (null == a || a > r.length) && (a = r.length);
		    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		    return n;
		  }
		  function _createForOfIteratorHelperLoose(r, e) {
		    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		    if (t) return (t = t.call(r)).next.bind(t);
		    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
		      t && (r = t);
		      var o = 0;
		      return function () {
		        return o >= r.length ? {
		          done: true
		        } : {
		          done: false,
		          value: r[o++]
		        };
		      };
		    }
		    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		  }
		  function _extends() {
		    return _extends = Object.assign ? Object.assign.bind() : function (n) {
		      for (var e = 1; e < arguments.length; e++) {
		        var t = arguments[e];
		        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		      }
		      return n;
		    }, _extends.apply(null, arguments);
		  }
		  function _unsupportedIterableToArray(r, a) {
		    if (r) {
		      if ("string" == typeof r) return _arrayLikeToArray(r, a);
		      var t = {}.toString.call(r).slice(8, -1);
		      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		    }
		  }

		  var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
		  function parseAssetId(ref) {
		    var _ref$split = ref.split('-'),
		      id = _ref$split[1],
		      dimensionString = _ref$split[2],
		      format = _ref$split[3];
		    if (!id || !dimensionString || !format) {
		      throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
		    }
		    var _dimensionString$spli = dimensionString.split('x'),
		      imgWidthStr = _dimensionString$spli[0],
		      imgHeightStr = _dimensionString$spli[1];
		    var width = +imgWidthStr;
		    var height = +imgHeightStr;
		    var isValidAssetId = isFinite(width) && isFinite(height);
		    if (!isValidAssetId) {
		      throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
		    }
		    return {
		      id: id,
		      width: width,
		      height: height,
		      format: format
		    };
		  }

		  var isRef = function isRef(src) {
		    var source = src;
		    return source ? typeof source._ref === 'string' : false;
		  };
		  var isAsset = function isAsset(src) {
		    var source = src;
		    return source ? typeof source._id === 'string' : false;
		  };
		  var isAssetStub = function isAssetStub(src) {
		    var source = src;
		    return source && source.asset ? typeof source.asset.url === 'string' : false;
		  };
		  // Detect in-progress uploads (has upload key but no complete asset reference)
		  var isInProgressUpload = function isInProgressUpload(src) {
		    if (typeof src === 'object' && src !== null) {
		      var obj = src;
		      // Check if it has an upload key (indicating in-progress upload)
		      return obj._upload && (!obj.asset || !obj.asset._ref);
		    }
		    return false;
		  };
		  // Convert an asset-id, asset or image to an image record suitable for processing
		  // eslint-disable-next-line complexity
		  function parseSource(source) {
		    if (!source) {
		      return null;
		    }
		    var image;
		    if (typeof source === 'string' && isUrl(source)) {
		      // Someone passed an existing image url?
		      image = {
		        asset: {
		          _ref: urlToId(source)
		        }
		      };
		    } else if (typeof source === 'string') {
		      // Just an asset id
		      image = {
		        asset: {
		          _ref: source
		        }
		      };
		    } else if (isRef(source)) {
		      // We just got passed an asset directly
		      image = {
		        asset: source
		      };
		    } else if (isAsset(source)) {
		      // If we were passed an image asset document
		      image = {
		        asset: {
		          _ref: source._id || ''
		        }
		      };
		    } else if (isAssetStub(source)) {
		      // If we were passed a partial asset (`url`, but no `_id`)
		      image = {
		        asset: {
		          _ref: urlToId(source.asset.url)
		        }
		      };
		    } else if (typeof source.asset === 'object') {
		      // Probably an actual image with materialized asset
		      image = _extends({}, source);
		    } else {
		      // We got something that does not look like an image, or it is an image
		      // that currently isn't sporting an asset.
		      return null;
		    }
		    var img = source;
		    if (img.crop) {
		      image.crop = img.crop;
		    }
		    if (img.hotspot) {
		      image.hotspot = img.hotspot;
		    }
		    return applyDefaults(image);
		  }
		  function isUrl(url) {
		    return /^https?:\/\//.test("" + url);
		  }
		  function urlToId(url) {
		    var parts = url.split('/').slice(-1);
		    return ("image-" + parts[0]).replace(/\.([a-z]+)$/, '-$1');
		  }
		  // Mock crop and hotspot if image lacks it
		  function applyDefaults(image) {
		    if (image.crop && image.hotspot) {
		      return image;
		    }
		    // We need to pad in default values for crop or hotspot
		    var result = _extends({}, image);
		    if (!result.crop) {
		      result.crop = {
		        left: 0,
		        top: 0,
		        bottom: 0,
		        right: 0
		      };
		    }
		    if (!result.hotspot) {
		      result.hotspot = {
		        x: 0.5,
		        y: 0.5,
		        height: 1.0,
		        width: 1.0
		      };
		    }
		    return result;
		  }

		  var SPEC_NAME_TO_URL_NAME_MAPPINGS = [['width', 'w'], ['height', 'h'], ['format', 'fm'], ['download', 'dl'], ['blur', 'blur'], ['sharpen', 'sharp'], ['invert', 'invert'], ['orientation', 'or'], ['minHeight', 'min-h'], ['maxHeight', 'max-h'], ['minWidth', 'min-w'], ['maxWidth', 'max-w'], ['quality', 'q'], ['fit', 'fit'], ['crop', 'crop'], ['saturation', 'sat'], ['auto', 'auto'], ['dpr', 'dpr'], ['pad', 'pad'], ['frame', 'frame']];
		  function urlForImage(options) {
		    var spec = _extends({}, options || {});
		    var source = spec.source;
		    delete spec.source;
		    var image = parseSource(source);
		    if (!image) {
		      if (source && isInProgressUpload(source)) {
		        // This is a placeholder image that will be replaced with the actual image when the upload is complete
		        // This is a 0x0 transparent PNG image
		        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=';
		      }
		      throw new Error("Unable to resolve image URL from source (" + JSON.stringify(source) + ")");
		    }
		    var id = image.asset._ref || image.asset._id || '';
		    var asset = parseAssetId(id);
		    // Compute crop rect in terms of pixel coordinates in the raw source image
		    var cropLeft = Math.round(image.crop.left * asset.width);
		    var cropTop = Math.round(image.crop.top * asset.height);
		    var crop = {
		      left: cropLeft,
		      top: cropTop,
		      width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
		      height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
		    };
		    // Compute hot spot rect in terms of pixel coordinates
		    var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
		    var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
		    var hotSpotCenterX = image.hotspot.x * asset.width;
		    var hotSpotCenterY = image.hotspot.y * asset.height;
		    var hotspot = {
		      left: hotSpotCenterX - hotSpotHorizontalRadius,
		      top: hotSpotCenterY - hotSpotVerticalRadius,
		      right: hotSpotCenterX + hotSpotHorizontalRadius,
		      bottom: hotSpotCenterY + hotSpotVerticalRadius
		    };
		    // If irrelevant, or if we are requested to: don't perform crop/fit based on
		    // the crop/hotspot.
		    if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
		      spec = _extends({}, spec, fit({
		        crop: crop,
		        hotspot: hotspot
		      }, spec));
		    }
		    return specToImageUrl(_extends({}, spec, {
		      asset: asset
		    }));
		  }
		  // eslint-disable-next-line complexity
		  function specToImageUrl(spec) {
		    var cdnUrl = (spec.baseUrl || 'https://cdn.sanity.io').replace(/\/+$/, '');
		    var vanityStub = spec.vanityName ? "/" + spec.vanityName : '';
		    var filename = spec.asset.id + "-" + spec.asset.width + "x" + spec.asset.height + "." + spec.asset.format + vanityStub;
		    var baseUrl = cdnUrl + "/images/" + spec.projectId + "/" + spec.dataset + "/" + filename;
		    var params = [];
		    if (spec.rect) {
		      // Only bother url with a crop if it actually crops anything
		      var _spec$rect = spec.rect,
		        left = _spec$rect.left,
		        top = _spec$rect.top,
		        width = _spec$rect.width,
		        height = _spec$rect.height;
		      var isEffectiveCrop = left !== 0 || top !== 0 || height !== spec.asset.height || width !== spec.asset.width;
		      if (isEffectiveCrop) {
		        params.push("rect=" + left + "," + top + "," + width + "," + height);
		      }
		    }
		    if (spec.bg) {
		      params.push("bg=" + spec.bg);
		    }
		    if (spec.focalPoint) {
		      params.push("fp-x=" + spec.focalPoint.x);
		      params.push("fp-y=" + spec.focalPoint.y);
		    }
		    var flip = [spec.flipHorizontal && 'h', spec.flipVertical && 'v'].filter(Boolean).join('');
		    if (flip) {
		      params.push("flip=" + flip);
		    }
		    // Map from spec name to url param name, and allow using the actual param name as an alternative
		    SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function (mapping) {
		      var specName = mapping[0],
		        param = mapping[1];
		      if (typeof spec[specName] !== 'undefined') {
		        params.push(param + "=" + encodeURIComponent(spec[specName]));
		      } else if (typeof spec[param] !== 'undefined') {
		        params.push(param + "=" + encodeURIComponent(spec[param]));
		      }
		    });
		    if (params.length === 0) {
		      return baseUrl;
		    }
		    return baseUrl + "?" + params.join('&');
		  }
		  function fit(source, spec) {
		    var cropRect;
		    var imgWidth = spec.width;
		    var imgHeight = spec.height;
		    // If we are not constraining the aspect ratio, we'll just use the whole crop
		    if (!(imgWidth && imgHeight)) {
		      return {
		        width: imgWidth,
		        height: imgHeight,
		        rect: source.crop
		      };
		    }
		    var crop = source.crop;
		    var hotspot = source.hotspot;
		    // If we are here, that means aspect ratio is locked and fitting will be a bit harder
		    var desiredAspectRatio = imgWidth / imgHeight;
		    var cropAspectRatio = crop.width / crop.height;
		    if (cropAspectRatio > desiredAspectRatio) {
		      // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
		      var height = Math.round(crop.height);
		      var width = Math.round(height * desiredAspectRatio);
		      var top = Math.max(0, Math.round(crop.top));
		      // Center output horizontally over hotspot
		      var hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
		      var left = Math.max(0, Math.round(hotspotXCenter - width / 2));
		      // Keep output within crop
		      if (left < crop.left) {
		        left = crop.left;
		      } else if (left + width > crop.left + crop.width) {
		        left = crop.left + crop.width - width;
		      }
		      cropRect = {
		        left: left,
		        top: top,
		        width: width,
		        height: height
		      };
		    } else {
		      // The crop is taller than the desired ratio, we are cutting from top and bottom
		      var _width = crop.width;
		      var _height = Math.round(_width / desiredAspectRatio);
		      var _left = Math.max(0, Math.round(crop.left));
		      // Center output vertically over hotspot
		      var hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);
		      var _top = Math.max(0, Math.round(hotspotYCenter - _height / 2));
		      // Keep output rect within crop
		      if (_top < crop.top) {
		        _top = crop.top;
		      } else if (_top + _height > crop.top + crop.height) {
		        _top = crop.top + crop.height - _height;
		      }
		      cropRect = {
		        left: _left,
		        top: _top,
		        width: _width,
		        height: _height
		      };
		    }
		    return {
		      width: imgWidth,
		      height: imgHeight,
		      rect: cropRect
		    };
		  }

		  var validFits = ['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min'];
		  var validCrops = ['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'];
		  var validAutoModes = ['format'];
		  function isSanityModernClientLike(client) {
		    return client && 'config' in client ? typeof client.config === 'function' : false;
		  }
		  function isSanityClientLike(client) {
		    return client && 'clientConfig' in client ? typeof client.clientConfig === 'object' : false;
		  }
		  function rewriteSpecName(key) {
		    var specs = SPEC_NAME_TO_URL_NAME_MAPPINGS;
		    for (var _iterator = _createForOfIteratorHelperLoose(specs), _step; !(_step = _iterator()).done;) {
		      var entry = _step.value;
		      var specName = entry[0],
		        param = entry[1];
		      if (key === specName || key === param) {
		        return specName;
		      }
		    }
		    return key;
		  }
		  function urlBuilder(options) {
		    // Did we get a modernish client?
		    if (isSanityModernClientLike(options)) {
		      // Inherit config from client
		      var _options$config = options.config(),
		        apiUrl = _options$config.apiHost,
		        projectId = _options$config.projectId,
		        dataset = _options$config.dataset;
		      var apiHost = apiUrl || 'https://api.sanity.io';
		      return new ImageUrlBuilder(null, {
		        baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
		        projectId: projectId,
		        dataset: dataset
		      });
		    }
		    // Did we get a SanityClient?
		    if (isSanityClientLike(options)) {
		      // Inherit config from client
		      var _options$clientConfig = options.clientConfig,
		        _apiUrl = _options$clientConfig.apiHost,
		        _projectId = _options$clientConfig.projectId,
		        _dataset = _options$clientConfig.dataset;
		      var _apiHost = _apiUrl || 'https://api.sanity.io';
		      return new ImageUrlBuilder(null, {
		        baseUrl: _apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
		        projectId: _projectId,
		        dataset: _dataset
		      });
		    }
		    // Or just accept the options as given
		    return new ImageUrlBuilder(null, options || {});
		  }
		  var ImageUrlBuilder = /*#__PURE__*/function () {
		    function ImageUrlBuilder(parent, options) {
		      this.options = void 0;
		      this.options = parent ? _extends({}, parent.options || {}, options || {}) // Merge parent options
		      : _extends({}, options || {}); // Copy options
		    }
		    var _proto = ImageUrlBuilder.prototype;
		    _proto.withOptions = function withOptions(options) {
		      var baseUrl = options.baseUrl || this.options.baseUrl;
		      var newOptions = {
		        baseUrl: baseUrl
		      };
		      for (var key in options) {
		        if (options.hasOwnProperty(key)) {
		          var specKey = rewriteSpecName(key);
		          newOptions[specKey] = options[key];
		        }
		      }
		      return new ImageUrlBuilder(this, _extends({
		        baseUrl: baseUrl
		      }, newOptions));
		    }
		    // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
		    // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
		    // studio, the 'image'-document must be provided.
		    ;
		    _proto.image = function image(source) {
		      return this.withOptions({
		        source: source
		      });
		    }
		    // Specify the dataset
		    ;
		    _proto.dataset = function dataset(_dataset2) {
		      return this.withOptions({
		        dataset: _dataset2
		      });
		    }
		    // Specify the projectId
		    ;
		    _proto.projectId = function projectId(_projectId2) {
		      return this.withOptions({
		        projectId: _projectId2
		      });
		    }
		    // Specify background color
		    ;
		    _proto.bg = function bg(_bg) {
		      return this.withOptions({
		        bg: _bg
		      });
		    }
		    // Set DPR scaling factor
		    ;
		    _proto.dpr = function dpr(_dpr) {
		      // A DPR of 1 is the default - so only include it if we have a different value
		      return this.withOptions(_dpr && _dpr !== 1 ? {
		        dpr: _dpr
		      } : {});
		    }
		    // Specify the width of the image in pixels
		    ;
		    _proto.width = function width(_width) {
		      return this.withOptions({
		        width: _width
		      });
		    }
		    // Specify the height of the image in pixels
		    ;
		    _proto.height = function height(_height) {
		      return this.withOptions({
		        height: _height
		      });
		    }
		    // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
		    ;
		    _proto.focalPoint = function focalPoint(x, y) {
		      return this.withOptions({
		        focalPoint: {
		          x: x,
		          y: y
		        }
		      });
		    };
		    _proto.maxWidth = function maxWidth(_maxWidth) {
		      return this.withOptions({
		        maxWidth: _maxWidth
		      });
		    };
		    _proto.minWidth = function minWidth(_minWidth) {
		      return this.withOptions({
		        minWidth: _minWidth
		      });
		    };
		    _proto.maxHeight = function maxHeight(_maxHeight) {
		      return this.withOptions({
		        maxHeight: _maxHeight
		      });
		    };
		    _proto.minHeight = function minHeight(_minHeight) {
		      return this.withOptions({
		        minHeight: _minHeight
		      });
		    }
		    // Specify width and height in pixels
		    ;
		    _proto.size = function size(width, height) {
		      return this.withOptions({
		        width: width,
		        height: height
		      });
		    }
		    // Specify blur between 0 and 100
		    ;
		    _proto.blur = function blur(_blur) {
		      return this.withOptions({
		        blur: _blur
		      });
		    };
		    _proto.sharpen = function sharpen(_sharpen) {
		      return this.withOptions({
		        sharpen: _sharpen
		      });
		    }
		    // Specify the desired rectangle of the image
		    ;
		    _proto.rect = function rect(left, top, width, height) {
		      return this.withOptions({
		        rect: {
		          left: left,
		          top: top,
		          width: width,
		          height: height
		        }
		      });
		    }
		    // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
		    ;
		    _proto.format = function format(_format) {
		      return this.withOptions({
		        format: _format
		      });
		    };
		    _proto.invert = function invert(_invert) {
		      return this.withOptions({
		        invert: _invert
		      });
		    }
		    // Rotation in degrees 0, 90, 180, 270
		    ;
		    _proto.orientation = function orientation(_orientation) {
		      return this.withOptions({
		        orientation: _orientation
		      });
		    }
		    // Compression quality 0-100
		    ;
		    _proto.quality = function quality(_quality) {
		      return this.withOptions({
		        quality: _quality
		      });
		    }
		    // Make it a download link. Parameter is default filename.
		    ;
		    _proto.forceDownload = function forceDownload(download) {
		      return this.withOptions({
		        download: download
		      });
		    }
		    // Flip image horizontally
		    ;
		    _proto.flipHorizontal = function flipHorizontal() {
		      return this.withOptions({
		        flipHorizontal: true
		      });
		    }
		    // Flip image vertically
		    ;
		    _proto.flipVertical = function flipVertical() {
		      return this.withOptions({
		        flipVertical: true
		      });
		    }
		    // Ignore crop/hotspot from image record, even when present
		    ;
		    _proto.ignoreImageParams = function ignoreImageParams() {
		      return this.withOptions({
		        ignoreImageParams: true
		      });
		    };
		    _proto.fit = function fit(value) {
		      if (validFits.indexOf(value) === -1) {
		        throw new Error("Invalid fit mode \"" + value + "\"");
		      }
		      return this.withOptions({
		        fit: value
		      });
		    };
		    _proto.crop = function crop(value) {
		      if (validCrops.indexOf(value) === -1) {
		        throw new Error("Invalid crop mode \"" + value + "\"");
		      }
		      return this.withOptions({
		        crop: value
		      });
		    }
		    // Saturation
		    ;
		    _proto.saturation = function saturation(_saturation) {
		      return this.withOptions({
		        saturation: _saturation
		      });
		    };
		    _proto.auto = function auto(value) {
		      if (validAutoModes.indexOf(value) === -1) {
		        throw new Error("Invalid auto mode \"" + value + "\"");
		      }
		      return this.withOptions({
		        auto: value
		      });
		    }
		    // Specify the number of pixels to pad the image
		    ;
		    _proto.pad = function pad(_pad) {
		      return this.withOptions({
		        pad: _pad
		      });
		    }
		    // Vanity URL for more SEO friendly URLs
		    ;
		    _proto.vanityName = function vanityName(value) {
		      return this.withOptions({
		        vanityName: value
		      });
		    };
		    _proto.frame = function frame(_frame) {
		      if (_frame !== 1) {
		        throw new Error("Invalid frame value \"" + _frame + "\"");
		      }
		      return this.withOptions({
		        frame: _frame
		      });
		    }
		    // Gets the url based on the submitted parameters
		    ;
		    _proto.url = function url() {
		      return urlForImage(this.options);
		    }
		    // Alias for url()
		    ;
		    _proto.toString = function toString() {
		      return this.url();
		    };
		    return ImageUrlBuilder;
		  }();

		  return urlBuilder;

		}));
		
	} (imageUrl_umd$1));
	return imageUrl_umd$1.exports;
}

var imageUrl_umdExports = /*@__PURE__*/ requireImageUrl_umd();
const imageUrlBuilder = /*@__PURE__*/getDefaultExportFromCjs(imageUrl_umdExports);

const projectId = process.env.SANITY_PROJECT_ID || "splvhmk1";
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2026-01-01";
const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
});
const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteTitle, seoDescription, ogImage, language, copyright,
    socialLinks, contactEmail, companyName
  }
`;
const servicesListQuery = `
  *[_type == "service"] | order(order asc) {
    title, "slug": slug.current, summary, icon, coverImage
  }
`;
const singletonPageQuery = `
  *[_type == "singletonPage" && pageId == $pageId][0] {
    title, subtitle, seoTitle, seoDescription, ogImage, heroImage, language, body, items
  }
`;

const $$Astro = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, seoTitle, ogImage, language } = Astro2.props;
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  const defaultLang = language || settings?.language || "en-GB";
  settings?.siteTitle || "wugweb \u2014 Digital Experience Agency";
  const defaultDesc = settings?.seoDescription || "Wugweb is a digital experience agency crafting brand strategy, UX design, martech, AI, and web development for ambitious teams.";
  const defaultOgImage = settings?.ogImage ? urlFor(settings.ogImage).width(1200).height(630).url() : "https://framerusercontent.com/assets/HGyE1GVVipOJ7v9BLJTPI7UW8.jpg";
  const defaultFavicon = settings?.favicon ? urlFor(settings.favicon).width(32).url() : "https://framerusercontent.com/images/yJuYg2lrJmWntF3zHlL9zyg8sdM.png";
  const defaultAppleTouch = settings?.favicon ? urlFor(settings.favicon).width(180).url() : "https://framerusercontent.com/images/eyKzVpdm2A4IB87tYf4LkVIM9mM.png";
  const copyrightText = settings?.copyright || "\xA9 2020\u20132026 Wugweb. All rights reserved.";
  const siteEmail = settings?.contactEmail || "hello@wugweb.com";
  const pageTitle = seoTitle || title;
  const metaDesc = description || defaultDesc;
  const metaOgImage = ogImage || defaultOgImage;
  return renderTemplate`<html${addAttribute(defaultLang, "lang")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${pageTitle} · wugweb</title><meta name="description"${addAttribute(metaDesc, "content")}><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(pageTitle + " \xB7 wugweb", "content")}><meta property="og:description"${addAttribute(metaDesc, "content")}><meta property="og:image"${addAttribute(metaOgImage, "content")}><!-- X / Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle + " \xB7 wugweb", "content")}><meta name="twitter:description"${addAttribute(metaDesc, "content")}><meta name="twitter:image"${addAttribute(metaOgImage, "content")}><!-- Favicon --><link${addAttribute(defaultFavicon, "href")} rel="icon"><link rel="apple-touch-icon"${addAttribute(defaultAppleTouch, "href")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500&family=Fragment+Mono:wght@400&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "SiteHeader", $$SiteHeader, { "companyEmail": siteEmail })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "SiteFooter", $$SiteFooter, { "copyright": copyrightText, "companyEmail": siteEmail })} </body></html>`;
}, "/Users/abcom/Documents/GitHub/wugweb_site/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, C, singletonPageQuery as a, servicesListQuery as b, sanityClient as s };
