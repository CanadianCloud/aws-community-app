import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleFeed } from '../data/sample';
import type { PublicFeed } from '../types/models';

const CACHE = 'awscommunity:feed:v1';
const URL = process.env.EXPO_PUBLIC_COMMUNITY_FEED_URL?.trim();
function valid(x: unknown): x is PublicFeed {
  if (!x || typeof x !== 'object') return false;
  const f = x as Partial<PublicFeed>;
  return f.version === 1 && Array.isArray(f.communities) && Array.isArray(f.events)
    && f.communities.every(c=> typeof c.id==='string' && typeof c.city==='string' && typeof c.website==='string')
    && f.events.every(e=>typeof e.id==='string' && typeof e.communityId==='string' && typeof e.title==='string' && (e.dateISO===null || typeof e.dateISO==='string'));
}
export async function loadFeed(): Promise<{feed:PublicFeed;source:'sample'|'cached'|'online'}> {
  let fallback = sampleFeed;
  let cached = false;
  try {
    const saved = await AsyncStorage.getItem(CACHE);
    if (saved && valid(JSON.parse(saved))) {fallback=JSON.parse(saved) as PublicFeed;cached=true;}
  } catch { /* storage blocked; use sample */ }
  if (!URL) return {feed:sampleFeed,source:'sample'};
  try {
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(),7000);
    let response: Response;
    try { response = await fetch(URL,{signal:controller.signal}); }
    finally {clearTimeout(timer);}
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data:unknown = await response.json();
    if (!valid(data)) throw new Error('Invalid community feed');
    try {await AsyncStorage.setItem(CACHE,JSON.stringify(data));} catch { /* optional caching */ }
    return {feed:data,source:'online'};
  } catch { return {feed:fallback,source:cached?'cached':'sample'}; }
}
