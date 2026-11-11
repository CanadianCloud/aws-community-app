import React from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CommunityProvider} from '../src/context/CommunityProvider';
import {C} from '../src/theme/tokens';

export default function RootLayout(){
  return <SafeAreaProvider><CommunityProvider>
    <StatusBar style="dark"/>
    <Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:C.cream}}}>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="event"/>
      <Stack.Screen name="group"/>
    </Stack>
  </CommunityProvider></SafeAreaProvider>;
}
