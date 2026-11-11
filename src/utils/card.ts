import type { Profile } from '../types/models';
export function makeVCard(p:Profile) {
  const safe=(s:string)=>s.replace(/[\\;,\n\r]/g,' ').trim();
  const name=safe(p.name||'AWS Community Member');
  const lines=['BEGIN:VCARD','VERSION:3.0',`FN:${name}`];
  if(p.role.trim()) lines.push(`TITLE:${safe(p.role)}`);
  if(p.email.trim()) lines.push(`EMAIL:${safe(p.email)}`);
  if(p.website.trim()) lines.push(`URL:${safe(p.website)}`);
  if(p.interests.trim()) lines.push(`NOTE:AWS Community — ${safe(p.interests)}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}
