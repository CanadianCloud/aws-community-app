import React,{useMemo,useState} from 'react';
import {View,TextInput} from 'react-native';
import {Page,ScreenHeader,T,Icon,Chip,DemoNotice} from '../../src/components/UI';
import {CommunityItem} from '../../src/components/CommunityItem';
import {useCommunity} from '../../src/context/CommunityProvider';
import {C,F} from '../../src/theme/tokens';
export default function Discover(){
  const {feed,following}=useCommunity();const [q,setQ]=useState('');const [onlyFollowing,setOnlyFollowing]=useState(false);
  const list=useMemo(()=>feed.communities.filter(g=>(!onlyFollowing||following.includes(g.id))&&`${g.label} ${g.city} ${g.country} ${g.region}`.toLowerCase().includes(q.toLowerCase())),[feed,q,onlyFollowing,following]);
  return <Page>
    <ScreenHeader title="Discover" subtitle="FIND YOUR PEOPLE, NEAR AND FAR"/>
    <T bold size={30}>Every community starts with hello.</T>
    <T color={C.muted} style={{marginTop:6,marginBottom:15}}>Follow the groups you care about and see their meetups together.</T>
    <DemoNotice/>
    <View style={{backgroundColor:C.white,borderRadius:18,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:9,marginBottom:14,borderColor:C.border,borderWidth:1}}>
      <Icon name="search-outline"/><TextInput value={q} onChangeText={setQ} placeholder="Search city, country or community" placeholderTextColor="#7F9388" style={{flex:1,paddingVertical:14,fontSize:15,fontFamily:F,color:C.green}}/>
    </View>
    <View style={{flexDirection:'row',gap:8,marginBottom:17}}><Chip label="All groups" selected={!onlyFollowing} onPress={()=>setOnlyFollowing(false)}/><Chip label={`Following (${following.length})`} selected={onlyFollowing} onPress={()=>setOnlyFollowing(true)}/></View>
    {list.map(g=><CommunityItem key={g.id} community={g}/>)}
    {list.length===0?<View style={{padding:24,alignItems:'center'}}><Icon name="earth-outline" size={38}/><T style={{marginTop:8}} color={C.muted}>No communities match your search.</T></View>:null}
    <T color={C.muted} size={12} style={{marginTop:13,textAlign:'center'}}>Initial pilot communities: Vancouver, Toronto and Victoria. More regions can join through the shared static feed.</T>
  </Page>;
}
