import { cachedFetch } from './sanity';

/**
 * Sectors showcase data — one query, one cache entry, shared by BaseLayout
 * (global instance) and index.astro (homepage instance). Both call this
 * rather than passing data between them: Astro runs page frontmatter before
 * the layout's, so the layout can't hand anything down.
 *
 * Notion Table 25 (sector) and Table 3 (industry) are the source; see
 * scripts/sync-notion-sectors.mjs. Only `sector` docs ticked for the showcase,
 * and only industries that reference one (`sectorRef`) and are ticked for the
 * card — so legacy `industry-<slug>` docs, which have no sectorRef, never show.
 */
export interface ShowcaseSector {
  _id: string;
  name: string;
  slug?: string;
  icon?: string;
  industries?: string[];
}

export const showcaseSectorsQuery = `*[_type == "sector" && showcase == true && !(_id in path("drafts.**"))] | order(showcaseOrder asc) {
  _id, name, "slug": slug.current, icon,
  "industries": *[_type == "industry" && references(^._id) && showOnSectorCard == true && !(_id in path("drafts.**"))] | order(order asc)[0...2].name
}`;

export function getShowcaseSectors(): Promise<ShowcaseSector[]> {
  return cachedFetch<ShowcaseSector[]>(showcaseSectorsQuery).then((r) => r || []).catch(() => []);
}

/**
 * /footer/industries directory: every sector by `order`, each with all of its
 * industries (sectored `industry` docs only; legacy `industry-<slug>` docs have
 * no sectorRef and never appear). Sectors, lines, icons and industries all come
 * from Sanity; the page hardcodes none of them.
 */
export interface DirectoryIndustry {
  name: string;
  slug?: string;
}

export interface DirectorySector {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  showcase?: boolean;
  showcaseOrder?: number;
  industries: DirectoryIndustry[];
}

export const industriesDirectoryQuery = `*[_type == "sector" && defined(slug.current) && !(_id in path("drafts.**"))] | order(order asc) {
  _id, name, "slug": slug.current, description, icon, showcase, showcaseOrder,
  "industries": *[_type == "industry" && references(^._id) && !(_id in path("drafts.**"))] | order(order asc) { name, "slug": slug.current }
}`;

export function getDirectorySectors(): Promise<DirectorySector[]> {
  return cachedFetch<DirectorySector[]>(industriesDirectoryQuery)
    .then((r) => (r || []).map((s) => ({ ...s, industries: (s.industries || []).filter((i) => i && i.name) })))
    .catch(() => []);
}
