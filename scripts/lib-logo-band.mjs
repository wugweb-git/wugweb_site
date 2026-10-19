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
// Prefer the 300w file (sharp on 2x screens); fall back to 150w.
export async function pickSource(slug) {
  for (const w of ['300w', '150w']) {
    const key = `assets/logos/grey/${slug}-${w}.png`;
    const r = await fetch(PUB + encodeURI(key), { method: 'HEAD', headers: UA });
    if (r.status === 200) return { key, w };
  }
  return null;
}
