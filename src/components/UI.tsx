import React from 'react';
import {View,Text,Pressable,ScrollView,StyleSheet,Platform,Linking,ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {C,F} from '../theme/tokens';
import {MiniCloud} from './HarborArt';
import {useCommunity} from '../context/CommunityProvider';
import {router} from 'expo-router';

export type IconName=React.ComponentProps<typeof Ionicons>['name'];
export function Icon({name,size=20,color=C.green}:{name:IconName;size?:number;color?:string}){return <Ionicons name={name} size={size} color={color}/>;}
export function T({children,size=16,bold=false,color=C.deep,style={},numberOfLines}:{children:React.ReactNode;size?:number;bold?:boolean;color?:string;style?:any;numberOfLines?:number}){
  return <Text numberOfLines={numberOfLines} style={[{fontSize:size,color,fontFamily:F,fontWeight:bold?'900':'500',lineHeight:size*1.24},style]}>{children}</Text>;
}
export function Page({children,scroll=true}:{children:React.ReactNode;scroll?:boolean}){
  return <SafeAreaView style={{flex:1,backgroundColor:C.cream}} edges={['top']}>
    {scroll?<ScrollView contentContainerStyle={{paddingHorizontal:20,paddingBottom:28}} showsVerticalScrollIndicator={false}>{children}</ScrollView>:<View style={{flex:1,paddingHorizontal:20}}>{children}</View>}
  </SafeAreaView>;
}
export function ScreenHeader({title,subtitle,back=false}:{title?:string;subtitle?:string;back?:boolean}){
  return <View style={{flexDirection:'row',alignItems:'center',paddingTop:10,paddingBottom:16,gap:12}}>
    {back?<Pressable onPress={()=>router.back()} accessibilityRole="button" accessibilityLabel="Back" style={styles.iconButton}><Icon name="arrow-back" size={24}/></Pressable>:<MiniCloud size={45}/>}
    <View style={{flex:1}}><T size={title?23:23} bold>{title||'AWS Community'}</T>{subtitle?<T color={C.muted} size={12}>{subtitle}</T>:null}</View>
    {!back?<Pressable onPress={()=>router.push('/discover')} accessibilityRole="button" accessibilityLabel="Find communities" style={styles.iconButton}><Icon name="globe-outline" size={22}/></Pressable>:null}
  </View>;
}
export function Heading({children,action,onAction}:{children:React.ReactNode;action?:string;onAction?:()=>void}){
  return <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:22,marginBottom:12}}><T size={23} bold>{children}</T>{action?<Pressable onPress={onAction} accessibilityRole="button"><T color={C.orange} size={14} bold>{action}  →</T></Pressable>:null}</View>;
}
export function Button({label,onPress,variant='solid',small=false,icon,disabled=false}:{label:string;onPress:()=>void;variant?:'solid'|'outline'|'light';small?:boolean;icon?:IconName;disabled?:boolean}){
  const isSolid=variant==='solid';return <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" style={({pressed})=>[styles.button,{backgroundColor:isSolid?C.orange:variant==='light'?C.cream:'transparent',borderWidth:isSolid?0:1.2,borderColor:isSolid?'transparent':C.green,paddingVertical:small?10:13,paddingHorizontal:small?16:19,opacity:disabled ? 0.45 : pressed ? 0.77 : 1}]}>
    <T bold size={small?13:15}>{label}</T>{icon?<Icon name={icon} size={small?16:19}/>:null}
  </Pressable>;
}
export function Chip({label,selected=false,onPress,background}:{label:string;selected?:boolean;onPress?:()=>void;background?:string}){
  return <Pressable disabled={!onPress} onPress={onPress} accessibilityRole={onPress?'button':undefined} style={{borderRadius:30,paddingVertical:9,paddingHorizontal:14,backgroundColor:background|| (selected?C.yellow:C.pale),borderWidth:selected?1.5:1,borderColor:selected?C.orange:C.border}}><T bold size={13}>{label}</T></Pressable>;
}
export function Card({children,background=C.white,style}:{children:React.ReactNode;background?:string;style?:any}){
  return <View style={[{backgroundColor:background,borderRadius:25,padding:17,overflow:'hidden'},style]}>{children}</View>;
}
export function DemoNotice(){const {feedSource}=useCommunity();if(feedSource!=='sample')return null;
  return <View style={{backgroundColor:C.yellow,borderRadius:12,padding:10,flexDirection:'row',gap:8,alignItems:'center',marginBottom:12}}><Icon name="information-circle-outline" size={18}/><View style={{flex:1}}><T size={11}>Demo catalogue: dates and RSVPs appear when organizers publish a real feed.</T></View></View>;
}
export function Loading(){return <View style={{padding:20}}><ActivityIndicator color={C.orange}/></View>}
export async function openExternal(url:string){try{const good=await Linking.canOpenURL(url);if(good)await Linking.openURL(url);}catch{ /* platform handles invalid URL */ }}
export const styles=StyleSheet.create({
  iconButton:{width:40,height:40,borderRadius:20,backgroundColor:C.white,alignItems:'center',justifyContent:'center'},
  button:{borderRadius:999,alignSelf:'flex-start',flexDirection:'row',gap:9,alignItems:'center',justifyContent:'center'},
  divider:{height:1,backgroundColor:C.border,marginVertical:13}
});
