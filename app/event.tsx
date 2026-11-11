import React from 'react';
import {View,Pressable} from 'react-native';
import {useLocalSearchParams,router} from 'expo-router';
import {Page,ScreenHeader,T,Card,Icon,Button,Chip,DemoNotice,openExternal} from '../src/components/UI';
import {HarborArt} from '../src/components/HarborArt';
import {useCommunity} from '../src/context/CommunityProvider';
import {C} from '../src/theme/tokens';
export default function EventDetail(){
  const params=useLocalSearchParams<{id:string}>();
  const {eventById,feed,saved,toggleSaved,attended,toggleAttended}=useCommunity();
  const e=eventById(params.id||'');
  if(!e)return <Page><ScreenHeader title="Event" back/><T>Event not found. The community may have updated its calendar.</T><Button label="Browse events" onPress={()=>router.replace('/events')}/></Page>;
  const community=feed.communities.find(c=>c.id===e.communityId);
  const isSaved=saved.includes(e.id),isAttended=attended.includes(e.id);
  const communityUrl=community?.website||'';
  return <Page>
    <ScreenHeader title="Event details" back/>
    <View style={{borderRadius:24,overflow:'hidden',backgroundColor:C.sky,marginBottom:17}}><HarborArt city={community?.city} height={169}/></View>
    <Chip label={e.kind==='community-day'?'✦ COMMUNITY DAY':e.kind==='meetup'?'● LOCAL MEETUP':'▣ WORKSHOP'} background={e.kind==='community-day'?C.sky:C.peach}/>
    <T size={32} bold style={{lineHeight:35,marginTop:13,marginBottom:9}}>{e.title}</T>
    <T size={16} color={C.muted} style={{marginBottom:20}}>{e.summary}</T>
    <DemoNotice/>
    <Card style={{gap:16,borderWidth:1,borderColor:C.border}}>
      <View style={{flexDirection:'row',gap:12,alignItems:'center'}}><Icon name="calendar-outline" size={23}/><View style={{flex:1}}><T size={12} color={C.muted}>WHEN</T><T bold>{e.dateISO?new Date(e.dateISO).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'}):e.dateLabel}</T></View></View>
      <View style={{height:1,backgroundColor:C.border}}/>
      <View style={{flexDirection:'row',gap:12,alignItems:'center'}}><Icon name="location-outline" size={23}/><View style={{flex:1}}><T size={12} color={C.muted}>WHERE</T><T bold>{e.venue}</T>{e.venueNote?<T size={13} color={C.muted}>{e.venueNote}</T>:null}</View></View>
      <View style={{height:1,backgroundColor:C.border}}/>
      <Pressable onPress={()=>router.push({pathname:'/group',params:{id:e.communityId}})} style={{flexDirection:'row',gap:12,alignItems:'center'}}><Icon name="people-outline" size={23}/><View style={{flex:1}}><T size={12} color={C.muted}>ORGANIZED BY</T><T bold>{community?.label||e.communityId}</T></View><Icon name="chevron-forward"/></Pressable>
    </Card>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:10,marginTop:16}}><Button label={isSaved?'Saved ✓':'Save event'} variant={isSaved?'outline':'solid'} icon={isSaved?'bookmark':'bookmark-outline'} onPress={()=>toggleSaved(e.id)}/><Button label={isAttended?'Logged ✓':'Add to passport'} variant="outline" icon="ribbon-outline" onPress={()=>toggleAttended(e.id)}/></View>
    <View style={{marginTop:20}}><Card background={C.lime}><T size={20} bold>Join your local community</T><T color={C.muted} size={13} style={{marginTop:5,marginBottom:14}}>{e.registrationUrl?'Registration is handled by the organizer.':'Registration details haven’t been published in this demo. Visit the local community website for current information.'}</T><Button label={e.registrationUrl?'Open registration':'Visit community website'} icon="open-outline" small onPress={()=>{if(e.registrationUrl)openExternal(e.registrationUrl);else if(communityUrl)openExternal(communityUrl);}}/></Card></View>
    <T size={12} color={C.muted} style={{marginTop:14,marginBottom:12}}>Adding an event to your passport is a personal log, not a verified check-in.</T>
  </Page>;
}
