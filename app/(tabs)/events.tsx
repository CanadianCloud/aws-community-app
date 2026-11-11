import React,{useMemo,useState} from 'react';
import {View} from 'react-native';
import {Page,ScreenHeader,Heading,T,Chip,DemoNotice,Icon} from '../../src/components/UI';
import {EventItem} from '../../src/components/EventItem';
import {useCommunity} from '../../src/context/CommunityProvider';
import {C} from '../../src/theme/tokens';
type Filter='following'|'all'|'saved';
type Category='all'|'meetup'|'community-day';
export default function Events(){
  const {feed,following,saved}=useCommunity();
  const [filter,setFilter]=useState<Filter>('following');const [category,setCategory]=useState<Category>('all');
  const list=useMemo(()=>feed.events.filter(e=>(filter==='all'||(filter==='saved'?saved.includes(e.id):following.includes(e.communityId)))&&(category==='all'||e.kind===category)).sort((a,b)=>{if(!a.dateISO)return 1;if(!b.dateISO)return -1;return a.dateISO.localeCompare(b.dateISO);}),[feed,filter,category,following,saved]);
  return <Page>
    <ScreenHeader title="Events" subtitle="MEETUPS · COMMUNITY DAYS · WORKSHOPS"/>
    <T bold size={30}>What's happening?</T>
    <T color={C.muted} style={{marginTop:7,marginBottom:16}}>Keep up with your groups and save the events you want to attend.</T>
    <DemoNotice/>
    <View style={{flexDirection:'row',gap:8,marginBottom:12,flexWrap:'wrap'}}><Chip label="Following" selected={filter==='following'} onPress={()=>setFilter('following')}/><Chip label="All events" selected={filter==='all'} onPress={()=>setFilter('all')}/><Chip label={`Saved (${saved.length})`} selected={filter==='saved'} onPress={()=>setFilter('saved')}/></View>
    <View style={{flexDirection:'row',gap:8,marginBottom:15,flexWrap:'wrap'}}><Chip label="Everything" selected={category==='all'} onPress={()=>setCategory('all')}/><Chip label="Meetups" selected={category==='meetup'} onPress={()=>setCategory('meetup')}/><Chip label="Community Days" selected={category==='community-day'} onPress={()=>setCategory('community-day')}/></View>
    <Heading>{list.length} {list.length===1?'event':'events'}</Heading>
    {list.map(e=><EventItem key={e.id} event={e}/>)}
    {list.length===0?<View style={{alignItems:'center',paddingVertical:35,gap:10}}><Icon name="calendar-outline" size={40} color={C.muted}/><T color={C.muted} size={15}>Nothing here yet. Follow more communities or save an event.</T></View>:null}
  </Page>;
}
