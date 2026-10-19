// Shared map for the homepage "Trusted by" band: the 28 logos the live wugweb.com band shows.
// slug -> { name: Sanity client name, src: existing R2 slug under assets/logos/grey/ }
// Order = live Framer order for the first 15, then the remaining 13 A-Z.
export const BAND = [
  ['adtech','Adtech'],['acko','Acko'],['tanishq','Tanishq'],['itc-limited','ITC Limited'],['airtel','Airtel'],
  ['amazon-ads','Amazon Ads'],['aditya-birla-capital','Aditya Birla Capital'],['ntuc','NTUC'],['linkedin-ads','LinkedIn Ads'],
  ['income','Income.SG'],['spicejet','SpiceJet'],['cartier','Cartier'],['indusind-bank','IndusInd Bank'],['youtube','YouTube Ads'],['fmi','FMI'],
  ['agp','AG&P'],['imedia','iMedia'],['inkompass','Inkompass'],['mda','MDA'],['paragon','Paragon'],
  ['philip-morris-international','Philip Morris International'],['sbs-transit','SBS Transit'],['sonnets-by-tata-coffee','Tata Sonnets'],
  ['surya','Surya'],['tecnotree','Tecnotree'],['tyroo','Tyroo'],['wave','Wave'],['woodkraft','WoodKraft'],
].map(([slug, name], i) => ({ slug, name, order: i + 1, dest: `assets/logos/band/${slug}.png` }));
export const PUB = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/';
export const UA = { 'User-Agent': 'Mozilla/5.0' };
// Colour originals (1500x876, padded canvas) for the logos whose grey copy is only 150w. Owner decision 2026-10-19.
// Cartier has no original and Acko's is a knocked-out white pill (reads as a solid block in the grey band), so both keep their 150w grey copy.
export const COLOUR = {
  adtech: '18_Adtech.png', airtel: '10_Airtel.png', spicejet: '03_Spicejet.png',
  'indusind-bank': '07_Indusind bank.png', agp: '15_AG_P.png', imedia: '02_imedia.png', inkompass: '09_Inkompass.png',
  mda: '23_MDA Online.png', 'philip-morris-international': '05_PMI.png', surya: '28_Surya softwares.png',
  tecnotree: '17_Tecnotree.png', tyroo: '08_Tyroo.png', wave: '30_Wave Group.png', woodkraft: '26_Woodkraft.png',
};
// Colour original first (trimmed + resized by the copy script), then the 300w grey file, then 150w.
export async function pickSource(slug) {
  if (COLOUR[slug]) {
    const key = `assets/logos/${COLOUR[slug]}`;
    const r = await fetch(PUB + encodeURI(key), { method: 'HEAD', headers: UA });
    if (r.status === 200) return { key, w: 'colour' };
  }
  for (const w of ['300w', '150w']) {
    const key = `assets/logos/grey/${slug}-${w}.png`;
    const r = await fetch(PUB + encodeURI(key), { method: 'HEAD', headers: UA });
    if (r.status === 200) return { key, w };
  }
  return null;
}
