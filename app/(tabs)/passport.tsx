import React from 'react';
import {View,Pressable} from 'react-native';
import {router} from 'expo-router';
import {Page,ScreenHeader,Card,T,Icon,Button,Heading} from '../../src/components/UI';
import {useCommunity} from '../../src/context/CommunityProvider';
import {C} from '../../src/theme/tokens';
export default function Passport(){
  const {attended,saved,following,feed}=useCommunity();
  const visited=Array.from(new Set(feed.events.filter(e=>attended.includes(e.id)).map(e=>e.communityId)));
  return <Page>
    <ScreenHeader title="Passport" subtitle="YOUR PERSONAL COMMUNITY JOURNEY"/>
    <T bold size={30}>Every meetup is a new connection.</T>
    <T color={C.muted} style={{marginTop:6,marginBottom:17}}>Keep your own history of events and communities. Yours to keep.</T>
    <Card background={C.green} style={{padding:23}}>
      <View style={{flexDirection:'row',gap:10,alignItems:'center'}}><Icon name="ribbon-outline" size={38} color={C.yellow}/><View style={{flex:1}}><T bold size={24} color={C.cream}>Community Passport</T><T size={13} color={C.lime}>Your journey starts here</T></View></View>
      <View style={{flexDirection:'row',marginTop:25,justifyContent:'space-between'}}>
        {[{n:attended.length,label:'Events logged'},{n:visited.length,label:'Cities visited'},{n:following.length,label:'Groups followed'}].map(i=><View key={i.label} style={{alignItems:'center',flex:1}}><T size={30} color={C.cream} bold>{i.n}</T><T size={11} color={C.lime} style={{textAlign:'center'}}>{i.label}</T></View>)}
      </View>
    </Card>
    <Heading>Your achievements</Heading>
    <View style={{flexDirection:'row',gap:10}}>
      {[{name:'First meetup',active:attended.length>0,icon:'sparkles-outline' as const},{name:'Explorer',active:visited.length>1,icon:'earth-outline' as const},{name:'Community builder',active:attended.length>=5,icon:'construct-outline' as const}].map(b=><View key={b.name} style={{flex:1,backgroundColor:b.active?C.yellow:C.white,borderRadius:17,padding:11,alignItems:'center',opacity:b.active?1:.55}}><Icon name={b.icon} size={31} color={b.active?C.orange:C.green}/><T size={12} bold style={{textAlign:'center',marginTop:8}}>{b.name}</T><T size={10} color={C.muted}>{b.active?'Earned':'Locked'}</T></View>)}
    </View>
    <Heading action="Explore events" onAction={()=>router.push('/events')}>Your event history</Heading>
    {attended.length ? feed.events.filter(e=>attended.includes(e.id)).map(e=><Pressable key={e.id} onPress={()=>router.push({pathname:'/event',params:{id:e.id}})} style={{marginBottom:9}}><Card background={C.lime} style={{flexDirection:'row',alignItems:'center',gap:12,padding:15}}><Icon name="checkmark-circle" size={27} color={C.green}/><View style={{flex:1}}><T size={15} bold>{e.title}</T><T size={12} color={C.muted}>{e.dateLabel}</T></View><Icon name="chevron-forward"/></Card></Pressable>):<Card background={C.peach}><T bold>Your adventure is just beginning.</T><T size={13} color={C.muted} style={{marginTop:6,marginBottom:12}}>Open an event and tap “Add to my passport” to keep a personal attendance record.</T><Button label="Explore events" icon="arrow-forward" small onPress={()=>router.push('/events')}/></Card>}
    <T size={12} color={C.muted} style={{marginTop:16}}>Passport stamps are self-reported and stored locally. They aren't verified entry tickets, credentials, or proof of event attendance.</T>
  </Page>;
}
