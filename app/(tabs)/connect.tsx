import React,{useState} from 'react';
import {View,TextInput,Share,Platform} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Page,ScreenHeader,Card,T,Icon,Button,Heading} from '../../src/components/UI';
import {useCommunity} from '../../src/context/CommunityProvider';
import {C,F} from '../../src/theme/tokens';
import {makeVCard} from '../../src/utils/card';
import type {Profile} from '../../src/types/models';

function Field({label,value,onChange,placeholder}:{label:string;value:string;onChange:(text:string)=>void;placeholder:string}){
  return <View style={{marginTop:13}}><T bold size={13}>{label}</T><TextInput value={value} onChangeText={onChange} placeholder={placeholder} autoCapitalize={label==='Email'||label==='Website'?'none':'sentences'} keyboardType={label==='Email'?'email-address':label==='Website'?'url':'default'} placeholderTextColor="#8AA095" style={{fontFamily:F,backgroundColor:C.cream,color:C.deep,borderRadius:13,borderWidth:1,borderColor:C.border,paddingVertical:11,paddingHorizontal:12,marginTop:6,fontSize:15}}/></View>;
}
export default function Connect(){
  const {profile,setProfile,feed,homeId}=useCommunity();const [showQr,setShowQr]=useState(false);
  const update=(k:keyof Profile,v:string)=>{setProfile({...profile,[k]:v});};
  const share=async()=>{try{await Share.share({message:makeVCard(profile),title:'My community contact card'});}catch{}};
  const home=feed.communities.find(c=>c.id===homeId);
  return <Page>
    <ScreenHeader title="Connect" subtitle="YOUR COMMUNITY CONNECTIONS"/>
    <T bold size={30}>Say hello, stay connected.</T>
    <T color={C.muted} style={{marginTop:6,marginBottom:16}}>Create a contact card you can show to anyone at a meetup. No account required.</T>
    <Card background={C.peach}>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}><View style={{backgroundColor:C.cream,padding:13,borderRadius:50}}><Icon name="person-outline" size={30}/></View><View style={{flex:1}}><T size={22} bold>{profile.name.trim()||'Your name'}</T><T size={13} color={C.muted}>{profile.role.trim()||'Community member'}</T><T color={C.orange} size={12} bold>{home?.label||'AWS Community'}</T></View></View>
    </Card>
    <Heading>Your contact card</Heading>
    <Card>
      <Field label="Name" value={profile.name} onChange={v=>update('name',v)} placeholder="Your name"/>
      <Field label="Role" value={profile.role} onChange={v=>update('role',v)} placeholder="Cloud engineer, student, builder..."/>
      <Field label="Email" value={profile.email} onChange={v=>update('email',v)} placeholder="Optional"/>
      <Field label="Website" value={profile.website} onChange={v=>update('website',v)} placeholder="https://..."/>
      <Field label="Interests" value={profile.interests} onChange={v=>update('interests',v)} placeholder="Serverless, Security, AI..."/>
      <View style={{flexDirection:'row',gap:8,flexWrap:'wrap',marginTop:17}}><Button label={showQr?'Hide QR card':'Show my QR card'} onPress={()=>setShowQr(v=>!v)} icon="qr-code-outline" small/><Button variant="outline" label="Share" onPress={share} icon="share-outline" small/></View>
    </Card>
    {showQr?<Card background={C.white} style={{alignItems:'center',marginTop:13,paddingVertical:27}}><T bold size={20}>Scan to save my contact</T><View style={{marginTop:18,padding:14,backgroundColor:C.white,borderRadius:12}}><QRCode value={makeVCard(profile)} size={210} color={C.deep} backgroundColor={C.white} ecl="M"/></View><T color={C.muted} size={12} style={{textAlign:'center',marginTop:10}}>Contains only the details you've entered above. Works offline.</T></Card>:null}
    <Heading>Get involved</Heading>
    <Card background={C.lime}><View style={{flexDirection:'row',alignItems:'flex-start',gap:11}}><Icon name="mic-outline" size={28}/><View style={{flex:1}}><T size={19} bold>Share what you're learning</T><T color={C.muted} size={13} style={{marginTop:5}}>Want to speak or volunteer? Attend a local meetup and introduce yourself to its organizers.</T></View></View></Card>
    <T size={12} color={C.muted} style={{marginTop:15,marginBottom:7}}>Your contact card is stored on this device. It isn't uploaded to a community directory. Don't include information you don't want to share in the QR code.</T>
  </Page>;
}
