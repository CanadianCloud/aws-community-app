import React from 'react';
import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {C,F} from '../../src/theme/tokens';

const icons={index:['home','home-outline'],discover:['compass','compass-outline'],events:['calendar','calendar-outline'],connect:['people','people-outline'],passport:['ribbon','ribbon-outline']} as const;
export default function TabsLayout(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:C.orange,tabBarInactiveTintColor:C.green,tabBarStyle:{backgroundColor:C.cream,height:66,borderTopColor:C.border,paddingTop:4,paddingBottom:5},tabBarLabelStyle:{fontFamily:F,fontWeight:'900',fontSize:11},tabBarIconStyle:{marginBottom:1}}}>
  {(['index','discover','events','connect','passport'] as const).map((name)=><Tabs.Screen key={name} name={name} options={{title:name==='index'?'Home':name.charAt(0).toUpperCase()+name.slice(1),tabBarIcon:({color,focused})=><Ionicons name={icons[name][focused?0:1]} size={23} color={color}/>}}/>)}
</Tabs>}
