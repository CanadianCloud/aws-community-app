import React from 'react';
import {View,Pressable} from 'react-native';
import {router} from 'expo-router';
import {HarborArt} from '../../src/components/HarborArt';
import {Button,Card,Chip,DemoNotice,Heading,Icon,Page,ScreenHeader,T} from '../../src/components/UI';
import {EventItem} from '../../src/components/EventItem';
import {useCommunity} from '../../src/context/CommunityProvider';
import {C} from '../../src/theme/tokens';

export default function Home(){
  const {feed,homeId,following,ready}=useCommunity();
  const current=feed.communities.find(g=>g.id===homeId)||feed.communities[0];
  const meetups=feed.events.filter(e=>e.communityId===current?.id && e.kind==='meetup');
  const day=feed.events.find(e=>e.communityId===current?.id && e.kind==='community-day');
  const first=meetups[0];
  return <Page>
    <ScreenHeader subtitle="USER GROUPS · MEETUPS · COMMUNITY DAYS"/>
    <Pressable onPress={()=>router.push('/discover')} style={{flexDirection:'row',alignItems:'center',gap:5,alignSelf:'flex-start',marginBottom:10}} accessibilityRole="button">
      <Icon name="location-sharp" size={15}/><T bold size={13}>{current?.city||'Choose a city'}, {current?.country||''}</T><Icon name="chevron-down" size={14}/>
    </Pressable>
    <View style={{marginBottom:14}}>
      <T size={35} bold style={{lineHeight:36,letterSpacing:-1.5}}>Your community.{'\n'}All year round.</T>
      <View style={{borderRadius:22,overflow:'hidden',marginTop:13,backgroundColor:C.sky}}><HarborArt city={current?.city} height={148}/></View>
    </View>
    <DemoNotice/>
    <Card background={C.peach} style={{marginTop:0,padding:18}}>
      <View style={{flexDirection:'row',gap:6,alignItems:'center',marginBottom:8}}><Icon name="calendar-outline" color={C.orange}/><T bold size={12} color={C.orange}>NEXT LOCAL MEETUP</T></View>
      <T bold size={25} style={{lineHeight:27,marginBottom:8}}>{first?.title||`${current?.label||'Local'} meetups`}</T>
      <T size={14} color={C.muted}>{first?.summary||'Connect with local builders at an upcoming event.'}</T>
      <View style={{flexDirection:'row',alignItems:'center',gap:6,marginTop:11,marginBottom:14}}><Icon name="time-outline" size={16}/><T size={13} bold>{first?.dateLabel||'Details coming soon'}</T></View>
      <Button label="Explore the meetup" onPress={()=>first?router.push({pathname:'/event',params:{id:first.id}}):router.push('/events')} icon="arrow-forward"/>
    </Card>
    {day?<Pressable onPress={()=>router.push({pathname:'/event',params:{id:day.id}})} accessibilityRole="button" style={{marginTop:12}}><Card background={C.sky} style={{padding:15}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <View style={{flex:1,gap:4}}><T color={C.orange} size={11} bold>OUR FLAGSHIP EVENT</T><T size={21} bold>{day.title}</T><T size={12} color={C.muted}>{day.dateLabel}</T><T color={C.orange} size={13} bold>Explore Community Day →</T></View>
        <View style={{width:100,height:100,overflow:'hidden',borderRadius:18}}><HarborArt city={current?.city} height={100}/></View>
      </View>
    </Card></Pressable>:null}
    <Heading action="Discover all" onAction={()=>router.push('/discover')}>Your communities</Heading>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>
      {feed.communities.filter(g=>following.includes(g.id)).map(g=><Chip key={g.id} label={`${g.city}  ✓`} selected={g.id===homeId} onPress={()=>router.push({pathname:'/group',params:{id:g.id}})} background={g.id===homeId?C.yellow:C.white}/>)}
      <Chip label="+ Follow more" onPress={()=>router.push('/discover')}/>
    </View>
    <Heading action="See events" onAction={()=>router.push('/events')}>Coming up</Heading>
    {feed.events.filter(e=>following.includes(e.communityId)&&e.id!==first?.id&&e.id!==day?.id).slice(0,3).map(e=><EventItem key={e.id} event={e} compact/>)}
    <View style={{marginTop:16}}><Card background={C.lime}>
      <T bold size={23}>Learn  <T color={C.orange} bold size={23}>·</T> Connect  <T color={C.orange} bold size={23}>·</T> Build</T>
      <T color={C.muted} style={{marginTop:6,marginBottom:12}} size={13}>Discover talks, meet builders and volunteer with your local group.</T>
      <Button variant="outline" small label="Find ways to get involved" onPress={()=>router.push('/connect')} icon="arrow-forward"/>
    </Card></View>
  </Page>;
}
