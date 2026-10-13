// Archives Sanity asset docs for the 11 files removed in delete batch 34. Dry run unless APPLY=1.
import fs from 'fs';
const T=process.env.SANITY_API_TOKEN||process.env.SANITY_TOKEN;if(!T){console.error('no SANITY token in env');process.exit(1)}
const H={Authorization:'Bearer '+T};
const keys=fs.readFileSync('backups/r2-delete-batch34.csv','utf8').trim().split('\n').slice(1).map(l=>l.split('","')[0].replace(/^"/,''));
const all=[...keys,...keys.map(k=>k.replace(/^assets\//,''))];
const g=`*[_type=="asset" && r2Key in ${JSON.stringify(all)}]`;
const recs=(await (await fetch(`https://splvhmk1.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(g)}`,{headers:H})).json()).result||[];
console.log('records',recs.length,'of',keys.length,'keys');
recs.forEach(r=>console.log(r.status,r.r2Key,(r.usedBy||[]).length?'USED '+JSON.stringify(r.usedBy):''));
fs.writeFileSync('backups/sanity-pre-batch34-archive.json',JSON.stringify(recs,null,1));
if(process.env.APPLY){
 const muts=recs.filter(r=>r.status!=='Archived').map(r=>({patch:{id:r._id,set:{status:'Archived',notes:((r.notes?r.notes+' | ':'')+'Archived: file removed in R2 delete batch 34')}}}));
 const r=await fetch('https://splvhmk1.api.sanity.io/v2024-01-01/data/mutate/production',{method:'POST',headers:{...H,'Content-Type':'application/json'},body:JSON.stringify({mutations:muts})});
 console.log('mutate',r.status,'archived',muts.length)}
