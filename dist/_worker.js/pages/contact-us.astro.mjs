globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_DXCcV6JH.mjs';
import { s as sanityClient, a as singletonPageQuery, $ as $$BaseLayout } from '../chunks/BaseLayout_DBknf3Fb.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$ContactUs = createComponent(async ($$result, $$props, $$slots) => {
  const page = await sanityClient.fetch(singletonPageQuery, { pageId: "contact" }).catch(() => null);
  const heroTitle = page?.title ?? "Are you ready to build something that matters?";
  const heroText = page?.body?.[0]?.children?.[0]?.text ?? "We're always looking for passionate clients and talented professionals to join us in creating impactful work. Whether you have a bold vision you want to bring to life or expertise to contribute, let's collaborate and make something great together.";
  const interests = ["Branding", "Design", "Software", "Product", "Marketing"];
  const budgets = ["<$3K", "<$6K", "<$15K", "<$25K"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Us", "description": "Have a project in mind? Get in touch with Wugweb for UI/UX design and digital solutions.", "data-astro-cid-5c24fmmt": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap contact" data-astro-cid-5c24fmmt> <div class="contact-intro" data-astro-cid-5c24fmmt> <h1 data-astro-cid-5c24fmmt>${heroTitle}</h1> <p data-astro-cid-5c24fmmt> ${heroText} </p> </div> <div class="contact-grid" data-astro-cid-5c24fmmt> <div class="contact-details" data-astro-cid-5c24fmmt> <div data-astro-cid-5c24fmmt> <p class="eyebrow" data-astro-cid-5c24fmmt>Email</p> <p class="detail-value" data-astro-cid-5c24fmmt><a href="mailto:hello@wugweb.com" data-astro-cid-5c24fmmt>hello@wugweb.com</a></p> </div> <div data-astro-cid-5c24fmmt> <p class="eyebrow" data-astro-cid-5c24fmmt>Phone</p> <p class="detail-value" data-astro-cid-5c24fmmt> <a href="tel:+918802139220" data-astro-cid-5c24fmmt>+91 88021 39220</a><br data-astro-cid-5c24fmmt> <a href="tel:+971504647672" data-astro-cid-5c24fmmt>+971 50 464 7672</a> </p> </div> <div data-astro-cid-5c24fmmt> <p class="eyebrow" data-astro-cid-5c24fmmt>Address</p> <p class="detail-value" data-astro-cid-5c24fmmt>
Floor 19, WeWork Berger Delhi One, C-001/A2, Sector 16B, Noida, UP, India - 201301
</p> </div> </div> <!-- Submits to /api/contact — see that file for what's actually
           wired up vs. still stubbed. --> <form class="contact-form" method="POST" action="/api/contact" data-astro-cid-5c24fmmt> <label data-astro-cid-5c24fmmt>
Hi, my name is
<input type="text" name="name" required data-astro-cid-5c24fmmt> </label> <label data-astro-cid-5c24fmmt>
and I'm from
<input type="text" name="company" placeholder="Company / location" data-astro-cid-5c24fmmt> </label> <fieldset data-astro-cid-5c24fmmt> <legend data-astro-cid-5c24fmmt>I'm interested in</legend> ${interests.map((i) => renderTemplate`<label class="checkbox" data-astro-cid-5c24fmmt> <input type="checkbox" name="interests"${addAttribute(i, "value")} data-astro-cid-5c24fmmt> ${i} </label>`)} </fieldset> <label data-astro-cid-5c24fmmt>
on the topic
<textarea name="topic" rows="3" placeholder="Tell us about the project" data-astro-cid-5c24fmmt></textarea> </label> <fieldset data-astro-cid-5c24fmmt> <legend data-astro-cid-5c24fmmt>My budget for this project is</legend> ${budgets.map((b) => renderTemplate`<label class="radio" data-astro-cid-5c24fmmt> <input type="radio" name="budget"${addAttribute(b, "value")} data-astro-cid-5c24fmmt> ${b} </label>`)} </fieldset> <label data-astro-cid-5c24fmmt>
I can contact via
<select name="contactMethod" data-astro-cid-5c24fmmt> <option data-astro-cid-5c24fmmt>Email</option> <option data-astro-cid-5c24fmmt>Phone</option> </select> </label> <label class="checkbox" data-astro-cid-5c24fmmt> <input type="checkbox" name="newsletter" value="yes" data-astro-cid-5c24fmmt>
I would like to receive newsletters by email. Read our <a href="/privacy-policy" data-astro-cid-5c24fmmt>Privacy Policy</a>.
</label> <button type="submit" class="btn btn-solid" data-astro-cid-5c24fmmt>Submit</button> </form> </div> </section> ` })}  ${renderScript($$result, "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/contact-us.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/contact-us.astro", void 0);

const $$file = "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/contact-us.astro";
const $$url = "/contact-us";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ContactUs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
