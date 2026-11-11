import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import type {CommunityEvent,Profile,PublicFeed} from '../types/models';
import {defaultProfile} from '../types/models';
import {sampleFeed} from '../data/sample';
import {loadFeed} from '../utils/feed';

type State = {
  feed:PublicFeed; feedSource:'sample'|'cached'|'online'; ready:boolean;
  homeId:string; setHomeId:(id:string)=>void;
  following:string[]; toggleFollowing:(id:string)=>void;
  saved:string[]; toggleSaved:(id:string)=>void;
  attended:string[]; toggleAttended:(id:string)=>void;
  profile:Profile; setProfile:(p:Profile)=>void;
  eventById:(id:string)=>CommunityEvent|undefined;
};
const Context=createContext<State|null>(null);
const KEY='awscommunity:personal:v1';
export function CommunityProvider({children}:{children:React.ReactNode}){
  const [feed,setFeed]=useState(sampleFeed);
  const [feedSource,setFeedSource]=useState<State['feedSource']>('sample');
  const [homeId,setHome]=useState('vancouver');
  const [following,setFollowing]=useState(['vancouver']);
  const [saved,setSaved]=useState<string[]>([]);
  const [attended,setAttended]=useState<string[]>([]);
  const [profile,setProfileState]=useState<Profile>(defaultProfile);
  const [ready,setReady]=useState(false);
  useEffect(()=>{let active=true;(async()=>{
    try {const raw=await AsyncStorage.getItem(KEY); if(active && raw){const p=JSON.parse(raw);
      if(typeof p.homeId==='string')setHome(p.homeId);
      if(Array.isArray(p.following))setFollowing(p.following.filter((v:unknown)=>typeof v==='string'));
      if(Array.isArray(p.saved))setSaved(p.saved.filter((v:unknown)=>typeof v==='string'));
      if(Array.isArray(p.attended))setAttended(p.attended.filter((v:unknown)=>typeof v==='string'));
      if(p.profile && typeof p.profile.name==='string')setProfileState({...defaultProfile,...p.profile});
    }}catch{} finally {if(active)setReady(true);}
    const result=await loadFeed();if(active){setFeed(result.feed);setFeedSource(result.source);}
  })();return()=>{active=false};},[]);
  useEffect(()=>{if(!ready)return;AsyncStorage.setItem(KEY,JSON.stringify({homeId,following,saved,attended,profile})).catch(()=>{});},[ready,homeId,following,saved,attended,profile]);
  const setHomeId=useCallback((id:string)=>{setHome(id);setFollowing(old=>old.includes(id)?old:[...old,id]);},[]);
  const toggleFollowing=useCallback((id:string)=>setFollowing(old=>old.includes(id)?old.filter(i=>i!==id):[...old,id]),[]);
  const toggleSaved=useCallback((id:string)=>setSaved(old=>old.includes(id)?old.filter(i=>i!==id):[...old,id]),[]);
  const toggleAttended=useCallback((id:string)=>setAttended(old=>old.includes(id)?old.filter(i=>i!==id):[...old,id]),[]);
  const eventById=useCallback((id:string)=>feed.events.find(e=>e.id===id),[feed]);
  const value=useMemo(()=>({feed,feedSource,ready,homeId,setHomeId,following,toggleFollowing,saved,toggleSaved,attended,toggleAttended,profile,setProfile:setProfileState,eventById}),[feed,feedSource,ready,homeId,setHomeId,following,toggleFollowing,saved,toggleSaved,attended,toggleAttended,profile,eventById]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCommunity(){const c=useContext(Context);if(!c)throw Error('CommunityProvider missing');return c;}
