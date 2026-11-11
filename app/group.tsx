import React from 'react';
import {View} from 'react-native';
import {useLocalSearchParams,router} from 'expo-router';
import {Page,ScreenHeader,T,Card,Heading,Button,Icon,DemoNotice,openExternal} from '../src/components/UI';
import {HarborArt} from '../src/components/HarborArt';
import {EventItem} from '../src/components/EventItem';
import {useCommunity} from '../src/context/CommunityProvider';
import {C} from '../src/theme/tokens';
export default function GroupDetail(){
  const {id}=useLocalSearchParams<{id:string}>();
  const {feed,following,toggleFollowing,homeId,setHomeId}=useCommunity();
  const group=feed.communities.find(g=>g.id===id);
  if(!group)return <Page><ScreenHeader title="Community" back/><T>Community not found.</T></Page>;
  const isFollowing=following.includes(group.id);
  const list=feed.events.filter(e=>e.communityId===group.id);
  return <Page>
    <ScreenHeader title="Your community" back/>
    <View style={{backgroundColor:group.color,borderRadius:25,overflow:'hidden'}}><HarborArt city={group.city} height={175}/></View>
    <T size={34} bold style={{marginTop:18}}>{group.label}</T>
    <View style={{flexDirection:'row',gap:5,alignItems:'center',marginTop:3,marginBottom:14}}><Icon name="location-sharp" size={14}/><T size={14} color={C.muted}>{group.city}, {group.region}, {group.country}</T></View>
    <T size={16} color={C.muted} style={{marginBottom:16}}>{group.tagline}</T>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:9}}><Button small label={isFollowing?'Following ✓':'Follow community'} variant={isFollowing?'outline':'solid'} onPress={()=>toggleFollowing(group.id)}/><Button small label={homeId===group.id?'Home community ✓':'Set as home'} variant="outline" onPress={()=>setHomeId(group.id)} disabled={homeId===group.id}/></View>
    <Heading>Events from this group</Heading>
    <DemoNotice/>
    {list.map(e=><EventItem key={e.id} event={e}/>)}
    <Heading>Get involved</Heading>
    <Card background={C.lime}><T size={19} bold>Meet the people behind the events</T><T size={13} color={C.muted} style={{marginTop:8,marginBottom:14}}>Join a monthly meetup, introduce yourself and ask about speaking, volunteering or helping your local organizers.</T><Button small label="Visit group website" icon="open-outline" onPress={()=>openExternal(group.website)}/></Card>
  </Page>;
}
