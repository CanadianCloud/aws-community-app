import React from 'react';
import {View,Pressable} from 'react-native';
import {router} from 'expo-router';
import {CommunityEvent} from '../types/models';
import {C} from '../theme/tokens';
import {T,Icon,Card,IconName} from './UI';
import {useCommunity} from '../context/CommunityProvider';

const kindColor={'meetup':C.peach,'community-day':C.sky,'workshop':C.lime};
const kindIcon:Record<CommunityEvent['kind'],IconName>={'meetup':'people-outline','community-day':'sparkles-outline','workshop':'hammer-outline'};
export function EventItem({event,compact=false}:{event:CommunityEvent;compact?:boolean}){
  const {saved, toggleSaved,feed}=useCommunity();
  const community=feed.communities.find(g=>g.id===event.communityId);
  const isSaved=saved.includes(event.id);
  return <Pressable onPress={()=>router.push({pathname:'/event',params:{id:event.id}})} accessibilityRole="button" style={{marginBottom:11}}>
    <Card background={kindColor[event.kind]} style={{padding:compact?13:16}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
        <View style={{backgroundColor:C.cream,borderRadius:17,padding:12}}><Icon name={kindIcon[event.kind]} size={24} color={C.green}/></View>
        <View style={{flex:1,gap:3}}>
          <T bold size={compact?15:18} numberOfLines={2}>{event.title}</T>
          <T color={C.muted} size={12}>{community?.city||'Community'} · {event.dateLabel}</T>
          {!compact?<T size={12} color={C.muted} numberOfLines={2}>{event.summary}</T>:null}
        </View>
        <Pressable onPress={(e)=>{e.stopPropagation();toggleSaved(event.id)}} hitSlop={12} accessibilityRole="button" accessibilityLabel={isSaved?'Remove saved event':'Save event'}>
          <Icon name={isSaved?'bookmark':'bookmark-outline'} color={isSaved?C.orange:C.green} size={22}/>
        </Pressable>
      </View>
    </Card>
  </Pressable>;
}
