import {createHash} from 'node:crypto';
export const overrides={vancouver:'https://vancouver.awsday.ca',toronto:'https://toronto.awsday.ca',victoria:'https://victoria.awsday.ca'};
const nameKey=value=>value.normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
export function mergeDirectory(existing,incoming){
  const records=new Map(existing.map(group=>[nameKey(group.label),{...group}]));
  for(const group of incoming){
    if(!group.label||!/^https?:\/\//i.test(group.website))throw Error('Invalid AWS directory entry');
    const key=nameKey(group.label);const previous=records.get(key);
    const id=previous?.id||'directory-'+createHash('sha256').update(group.label+'|'+group.website).digest('hex').slice(0,12);
    records.set(key,{region:'',tagline:'',color:'#E2EDBF',...previous,...group,id});
  }
  for(const [city,website] of Object.entries(overrides)){
    const matches=[...records.entries()].filter(([,group])=>(group.city.toLowerCase()===city&&group.country==='Canada')||group.id===city||nameKey(group.label)===`aws user group ${city}`);
    if(matches.length){for(const [key,group] of matches)records.set(key,{...group,website});}
    else records.set(`aws user group ${city}`,{id:city,city:city[0].toUpperCase()+city.slice(1),country:'Canada',region:'',label:`AWS User Group ${city[0].toUpperCase()+city.slice(1)}`,tagline:'',website,color:'#E2EDBF'});
  }
  return [...records.values()].sort((a,b)=>a.country.localeCompare(b.country)||a.city.localeCompare(b.city)||a.label.localeCompare(b.label));
}
