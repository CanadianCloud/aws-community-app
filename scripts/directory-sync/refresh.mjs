import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import {mergeDirectory} from './merge.mjs';
const target=new URL('../../src/data/community-directory.json',import.meta.url);
const existing=JSON.parse(await readFile(target,'utf8'));
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage();
  await page.goto('https://builder.aws.com/community/user-groups#directory',{waitUntil:'load',timeout:60000});
  const decline=page.getByRole('button',{name:'Decline',exact:true});
  if(await decline.count()){await decline.click();await decline.waitFor({state:'hidden',timeout:10000});}
  await page.getByRole('heading',{name:'AWS User Group Adelaide',exact:true}).waitFor({timeout:30000});
  const count=()=>page.locator('h3').count();
  for(let round=0;round<100;round++){
    const more=page.getByRole('button',{name:/^Load more$/i});
    if(!await more.count())break;
    const before=await count();await more.click();
    await page.waitForFunction(previous=>document.querySelectorAll('h3').length>previous||!Array.from(document.querySelectorAll('button')).some(button=>button.textContent.trim()==='Load more'),before,{timeout:30000});
    console.log('Loaded headings:',await count());
    if(round===99)throw Error('AWS directory pagination did not finish');
  }
  const groups=await page.evaluate(()=>{
    const output=[];
    for(const heading of document.querySelectorAll('h3')){
      let card=heading.parentElement;
      while(card&&card.querySelectorAll('h3').length===1&&!Array.from(card.querySelectorAll('a')).some(link=>link.textContent.trim().startsWith('Join')))card=card.parentElement;
      if(!card||card.querySelectorAll('h3').length!==1)continue;
      const link=Array.from(card.querySelectorAll('a')).find(link=>link.textContent.trim().startsWith('Join'));
      if(!link)continue;
      const label=heading.textContent.trim();
      let details=card;while(details.parentElement&&details.parentElement.querySelectorAll('h3').length===1)details=details.parentElement;
      const lines=details.innerText.split('\n').map(line=>line.trim()).filter(line=>line&&line!==label&&!line.startsWith('Join'));
      const location=lines.find(line=>line.includes(','))||'';const parts=location.split(',').map(part=>part.trim());
      output.push({label,website:link.href,city:parts[0]||'',country:parts.length>1?parts.at(-1):'',region:parts.length>2?parts.slice(1,-1).join(', '):''});
    }
    return output;
  });
  if(groups.length<100)throw Error(`Only ${groups.length} groups retrieved; keeping the existing directory unchanged`);
  const merged=mergeDirectory(existing,groups);
  await writeFile(target,JSON.stringify(merged,null,2)+'\n');
  console.log(`Read ${groups.length} AWS entries. Catalogue: ${existing.length} → ${merged.length}. Canadian overrides retained.`);
}finally{await browser.close();}

