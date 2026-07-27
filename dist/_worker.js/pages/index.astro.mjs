globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_DXCcV6JH.mjs';
import { s as sanityClient, b as servicesListQuery, a as singletonPageQuery, $ as $$BaseLayout } from '../chunks/BaseLayout_DBknf3Fb.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const services = await sanityClient.fetch(servicesListQuery).catch(() => []);
  const homePage = await sanityClient.fetch(singletonPageQuery, { pageId: "home" }).catch(() => null);
  const headlineText = homePage?.title ?? "Where Vision Meets Velocity";
  const introParas = (homePage?.body ?? []).map((b) => b?.children?.[0]?.text).filter(Boolean);
  const fallbackIntro = [
    "Wugweb is a digital experience agency where design meets engineering to shape what is next. We deliver tailored UX design services, rooted in user-centered design and driven by a clear user experience strategy.",
    "Our experience design services and custom UX solutions help businesses craft impactful digital product design with precision. As a UI/UX-focused agency, we create digital experiences that not only look great but also perform with purpose."
  ];
  const intro = introParas.length ? introParas : fallbackIntro;
  const teaserServices = [
    {
      n: "01",
      title: "Brand & Strategy",
      copy: "From brand strategy and naming to logo design, guidelines, campaigns, and messaging, we create meaningful brands that connect with the right audience.",
      video: "https://wugweb.online/assets/more/home/Brand%20%26%20Strategy.mp4"
    },
    {
      n: "02",
      title: "Experience Design",
      copy: "Our approach integrates UX strategy, UX process, and consistent UX execution supported by flexible product design systems to deliver scalable and brand-led solutions.",
      video: "https://wugweb.online/assets/more/home/Experience%20Design.mp4"
    },
    {
      n: "03",
      title: "Martech & Gen AI",
      copy: "We blend digital experience strategy with AI-powered marketing and generative AI in marketing, helping brands automate, personalize, and optimize user journeys across channels.",
      video: "https://wugweb.online/assets/more/home/Martech%20%26%20GenAi.mp4"
    },
    {
      n: "04",
      title: "Web Development",
      copy: "From static websites to fully customized platforms, we use full-stack development, CMS integration, and mobile-first design to build secure, high-performance websites and scalable web applications.",
      video: "https://wugweb.online/assets/more/home/Web%20%26%20App%20Development.mp4"
    }
  ];
  const workItems = [
    { client: "Aditya Birla Capital", category: "UX Design", title: "Demystifying Finance: Crafting the UX for Aditya Birla Capital's Credit Score Tool", slug: "demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool", video: "https://wugweb.online/assets/work/Inkompass/inkompass_thumb.mp4" },
    { client: "Axis Bank", category: "Strategy, UX Design", title: "The Architecture of Loyalty: Designing the Axis Bank Savings Account Platform", slug: "the-architecture-of-loyalty-designing-the-axis-bank-savings-account-platform", video: "https://wugweb.online/assets/work/Axis%20Bank/axis_thumb.mp4" },
    { client: "METCRED", category: "UX Design, Strategy", title: "The Avant-Garde of Banking: Designing the METCRED Zero-Fee Mobile Experience", slug: "the-avant-garde-of-banking-designing-the-metcred-zero-fee-mobile-experience", video: "https://wugweb.online/assets/work/Metcred/metcred_thumb.mp4" },
    { client: "Philip Morris International", category: "UX Design", title: "Redesigning Inkompass \u2013 Cultivating Global Talent for a Smoke-Free Future", slug: "redesigning-inkompass-cultivating-global-talent-for-a-smoke-free-future", video: "https://wugweb.online/assets/work/Inkompass/inkompass_thumb.mp4" },
    { client: "Airtel", category: "UX Design", title: "Airtel Xsafe \u2013 Securing Homes with Intuitive Digital Experiences", slug: "airtel-xsafe-securing-homes-with-intuitive-digital-experiences", video: "https://wugweb.online/assets/work/Airtel%20Xsafe/Xsafe_thumb.mp4" },
    { client: "VisiONE", category: "UX Design", title: "VisiONE \u2013 Empowering Workforce Development with Competency-Based Assessments", slug: "visione-empowering-workforce-development-with-competency-based-assessments", video: "https://wugweb.online/assets/work/VisiOne/visiOne_thumb.mp4" },
    { client: "IndusInd Bank", category: "UX Design", title: "IndusNinja \u2013 Your AI-Powered Financial Ninja", slug: "indusninja-your-ai-powered-financial-ninja", video: "https://wugweb.online/assets/work/Indusninja/Indusninja_thumb.mp4" },
    { client: "Sadhan", category: "UX Design, Strategy", title: "Sadhan \u2013 Streamlining Driver Onboarding & Lead Management", slug: "sadhan-streamlining-driver-onboarding-lead-management", video: "https://wugweb.online/assets/work/Sadhan/sadhan_thumb.mp4" }
  ];
  const clientLogos = [
    { name: "Adtech", src: "https://framerusercontent.com/images/nc5UeWDPtjs9Ymj2mqK3OsFE.png" },
    { name: "Acko", src: "https://framerusercontent.com/images/7ZWZTC1heH7oAj2UEPk5WdmqgE.png" },
    { name: "Tanishq", src: "https://framerusercontent.com/images/RMGYiWyKTtfr6KxxFAgEP6B0s.png" },
    { name: "ITC", src: "https://framerusercontent.com/images/MNcVx0PTQNUOilSjr6j5zgy51u4.png" },
    { name: "Airtel", src: "https://framerusercontent.com/images/gYvQx01uxXUY8MKGB3kwJmqAQ.png" },
    { name: "Amazon Ads", src: "https://framerusercontent.com/images/vEyEWvs1Yb10Zww15nV4Db3E.png" },
    { name: "Aditya Birla Capital", src: "https://framerusercontent.com/images/F3H5mFd6YHEScmNRUFoy0ootKmQ.png" },
    { name: "NTUC", src: "https://framerusercontent.com/images/Xl4UZzHZx3eaDLzAtv1eQuxMac.png" },
    { name: "LinkedIn Ads", src: "https://framerusercontent.com/images/rhwTBbwxdPvvu180QCe16R0Ec.png" },
    { name: "U Income", src: "https://framerusercontent.com/images/9qQKBgCdUhU3Kv9lvj444xJXR4.png" },
    { name: "SpiceJet", src: "https://framerusercontent.com/images/iuPX9c0k6RRUKQwrtJlHCt4ymA.png" },
    { name: "Cartier", src: "https://framerusercontent.com/images/v3NYQBsmFqqlpLiBPnTSQgmgm9Q.png" },
    { name: "IndusInd Bank", src: "https://framerusercontent.com/images/OAJmygOGcSwLJKPhchwfcg95vg.png" }
  ];
  const industries = [
    "Government",
    "Insurtech",
    "Travel",
    "Logistics",
    "Automotive",
    "Fintech",
    "Edtech",
    "Sports",
    "E-commerce",
    "Media",
    "Energy",
    "NGOs"
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home", "description": "Wugweb is a digital experience agency crafting brand strategy, UX design, martech, AI, and web development for ambitious teams.", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <video class="hero-video" autoplay muted loop playsinline src="https://wugweb.online/assets/more/home/Home.mp4" data-astro-cid-j7pv25f6></video> <div class="hero-overlay" data-astro-cid-j7pv25f6></div> <!-- Nav comes from the shared SiteHeader in BaseLayout, rendered in
         normal flow above this section — not overlaid transparently on
         the video like the original. Deliberate simplification: safer
         than absolute-positioning it with no way for me to visually
         verify the result. Worth revisiting once you can see it live. --> <div class="wrap hero-content" data-astro-cid-j7pv25f6> <p class="eyebrow" data-reveal data-astro-cid-j7pv25f6>A world-class digital experience agency</p> <h1 class="hero-headline" data-headline data-astro-cid-j7pv25f6>${headlineText}</h1> <div class="hero-ctas" data-reveal data-astro-cid-j7pv25f6> <a href="#services-content" class="btn btn-ghost" data-astro-cid-j7pv25f6>Explore Wugweb</a> <a href="/contact-us" class="btn btn-solid" data-astro-cid-j7pv25f6>Get in Touch</a> </div> </div> <div class="scroll-cue" data-reveal aria-hidden="true" data-astro-cid-j7pv25f6></div> </section>  <section class="wrap intro" data-astro-cid-j7pv25f6> <h2 data-reveal data-astro-cid-j7pv25f6>Wugweb is a tight team of thoughtful creatives, engineers, and strategists</h2> <div class="intro-body" data-astro-cid-j7pv25f6> <div class="intro-copy" data-reveal data-astro-cid-j7pv25f6> ${intro.map((p) => renderTemplate`<p data-astro-cid-j7pv25f6>${p}</p>`)} </div> <ul class="intro-tags" data-reveal aria-hidden="true" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6>strategy</li> <li data-astro-cid-j7pv25f6>technology</li> <li data-astro-cid-j7pv25f6>design</li> <li data-astro-cid-j7pv25f6>we are here</li> </ul> </div> </section>  <section class="wrap services" id="services-content" data-astro-cid-j7pv25f6> <p class="eyebrow" data-reveal data-astro-cid-j7pv25f6>What we do</p> <h2 data-reveal data-astro-cid-j7pv25f6>Crafting UI, UX, and Brand Systems that drive meaning</h2> <p class="services-lede" data-reveal data-astro-cid-j7pv25f6>
In a world where the unexpected is becoming the norm, we build custom digital solutions
      through user experience design, delivering UX design services that are prepared for what is
      possible and what is probable. As a UI UX design agency, we craft experiences that adapt,
      evolve, and perform.
</p> <ol class="service-rows" data-astro-cid-j7pv25f6> ${teaserServices.map((s) => renderTemplate`<li class="service-row" data-reveal data-astro-cid-j7pv25f6> <span class="service-n" data-astro-cid-j7pv25f6>${s.n}</span> <div class="service-text" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${s.title}</h3> <p data-astro-cid-j7pv25f6>${s.copy}</p> </div> <video class="service-video" autoplay muted loop playsinline${addAttribute(s.video, "src")} data-astro-cid-j7pv25f6></video> </li>`)} </ol> <a href="/services" class="btn btn-ghost" data-astro-cid-j7pv25f6>View Services</a> </section>  <section class="wrap work" data-astro-cid-j7pv25f6> <div class="work-head" data-astro-cid-j7pv25f6> <h2 data-reveal data-astro-cid-j7pv25f6>Work that Leads with Clarity and Delivers with Impact</h2> <a href="/work" class="btn btn-ghost" data-astro-cid-j7pv25f6>View case studies</a> </div> <ul class="work-grid" data-astro-cid-j7pv25f6> ${workItems.map((w) => renderTemplate`<li data-reveal data-astro-cid-j7pv25f6> <a${addAttribute(`/work/${w.slug}`, "href")} data-astro-cid-j7pv25f6> <video autoplay muted loop playsinline${addAttribute(w.video, "src")} data-astro-cid-j7pv25f6></video> <p class="work-client" data-astro-cid-j7pv25f6>${w.client} — ${w.category}</p> <h3 data-astro-cid-j7pv25f6>${w.title}</h3> </a> </li>`)} </ul> </section>  <section class="wrap logos" data-astro-cid-j7pv25f6> <p class="eyebrow" data-reveal data-astro-cid-j7pv25f6>Trusted by leading brands</p> <ul class="logo-grid" data-reveal data-astro-cid-j7pv25f6> ${clientLogos.map((l) => renderTemplate`<li data-astro-cid-j7pv25f6><img${addAttribute(l.src, "src")}${addAttribute(l.name, "alt")} loading="lazy" data-astro-cid-j7pv25f6></li>`)} </ul> </section>  <section class="wrap industries" data-astro-cid-j7pv25f6> <h2 data-reveal data-astro-cid-j7pv25f6>Industries We Empower</h2> <p data-reveal data-astro-cid-j7pv25f6>
From local businesses to international corporations, our clients all share one common
      understanding when it comes to building authentic brands: the power of research, strategy,
      creativity, and design.
</p> <a href="/about" class="btn btn-ghost" data-astro-cid-j7pv25f6>More about us</a> <ul class="industry-grid" data-astro-cid-j7pv25f6> ${industries.map((i) => renderTemplate`<li data-reveal data-astro-cid-j7pv25f6>${i}</li>`)} </ul> </section>  <section class="wrap blog-teaser" data-astro-cid-j7pv25f6> <div class="work-head" data-astro-cid-j7pv25f6> <h2 data-reveal data-astro-cid-j7pv25f6>Some of our recent thoughts</h2> <a href="/blog" class="btn btn-ghost" data-astro-cid-j7pv25f6>Visit our Blog</a> </div> <ul data-astro-cid-j7pv25f6> <li data-reveal data-astro-cid-j7pv25f6><span class="eyebrow" data-astro-cid-j7pv25f6>Tech</span><a href="/blog/is-augmented-reality-the-future-of-ux" data-astro-cid-j7pv25f6>Is Augmented Reality the future of UX?</a></li> <li data-reveal data-astro-cid-j7pv25f6><span class="eyebrow" data-astro-cid-j7pv25f6>Martech</span><a href="/blog/6-strategies-that-got-my-side-project-its-first-1-000-users" data-astro-cid-j7pv25f6>6 Strategies That Got My Side Project Its First 1,000 Users</a></li> <li data-reveal data-astro-cid-j7pv25f6><span class="eyebrow" data-astro-cid-j7pv25f6>Design</span><a href="/blog/10-a-hole-design-patterns" data-astro-cid-j7pv25f6>10 A**hole Design Patterns</a></li> </ul> </section>  <section class="wrap closing-cta" data-astro-cid-j7pv25f6> <h2 data-reveal data-astro-cid-j7pv25f6>We speak your Industry's language.</h2> <p data-reveal data-astro-cid-j7pv25f6>Partner with Wugweb for domain-driven design and development that delivers.</p> <a href="/contact-us" class="btn btn-solid" data-astro-cid-j7pv25f6>Request Quote</a> </section> <p class="wrap" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--fg-muted); padding-block: 3rem;" data-astro-cid-j7pv25f6> ${services.length} services in Sanity
</p> ` })}  ${renderScript($$result, "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/index.astro", void 0);

const $$file = "/Users/abcom/Documents/GitHub/wugweb_site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
