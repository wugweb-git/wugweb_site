// Root re-export so @sanity/astro (which looks for /sanity.config) embeds the
// same Studio as wugweb.sanity.studio. One config, in sanity/.
export { default } from './sanity/sanity.config';
