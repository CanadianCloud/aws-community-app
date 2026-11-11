import React from 'react';
import {View,Pressable} from 'react-native';
import {router} from 'expo-router';
import type {Community} from '../types/models';
import {useCommunity} from '../context/CommunityProvider';
import {C} from '../theme/tokens';
import {Card,T,Button,Icon} from './UI';
export function CommunityItem({community}:{community:Community}){
  const {homeId,following,toggleFollowing,setHomeId}=useCommunity();
  const isFollowing=following.includes(community.id);
  return <Card style={{marginBottom:12,borderWidth:1,borderColor:C.border}}>
    <Pressable onPress={()=>router.push({pathname:'/group',params:{id:community.id}})} style={{flexDirection:'row',alignItems:'center',gap:12}} accessibilityRole="button">
      <View style={{width:53,height:53,borderRadius:17,backgroundColor:community.color,alignItems:'center',justifyContent:'center'}}><Icon name="location" color={C.green} size={25}/></View>
      <View style={{flex:1}}><T bold size={18}>{community.label}</T><T size={12} color={C.muted}>{community.city}, {community.country}</T></View>
      <Icon name="chevron-forward"/>
    </Pressable>
    <T style={{marginVertical:10}} color={C.muted} size={13}>{community.tagline}</T>
    <View style={{flexDirection:'row',gap:8,alignItems:'center',flexWrap:'wrap'}}>
      <Button small label={isFollowing?'Following ✓':'Follow group'} variant={isFollowing?'outline':'solid'} onPress={()=>toggleFollowing(community.id)}/>
      {homeId===community.id?<T size={12} color={C.muted} bold>Home community</T>:<Button small label="Set as home" variant="light" onPress={()=>setHomeId(community.id)}/>}
    </View>
  </Card>;
}
