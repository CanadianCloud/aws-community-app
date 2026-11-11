import React from 'react';
import Svg,{Circle,Ellipse,Path,Rect,Line,Polygon} from 'react-native-svg';
import {C} from '../theme/tokens';

// Original vector scenery, no third-party image hosting. City details vary by community.
export function HarborArt({city='Vancouver',height=150}:{city?:string;height?:number}){
  const van=city.toLowerCase().includes('vancouver');
  const tor=city.toLowerCase().includes('toronto');
  return <Svg width="100%" height={height} viewBox="0 0 390 158" preserveAspectRatio="xMidYMid slice">
    <Rect width="390" height="158" fill={C.sky}/>
    <Circle cx="335" cy="24" r="27" fill="#FFF0B8"/>
    <Path d="M0 48 Q35 23 84 45 Q120 35 155 48 Q205 20 263 47 Q335 25 390 46 V0 H0 Z" fill="#D5F3EC"/>
    <Path d="M0 108 L65 57 L89 73 L140 22 L193 88 L231 46 L271 79 L324 29 L390 103 L390 158 L0 158Z" fill="#75BCD0"/>
    <Path d="M92 68 L140 22 L170 67 L153 59 L141 40 L123 59 L112 54Z M291 61 L324 29 L353 68 L332 59 L325 44 L313 55Z" fill="#F9F9EA"/>
    <Path d="M0 116 Q64 89 112 107 Q177 74 242 107 Q312 82 390 114 V158 H0 Z" fill="#398F77"/>
    <Rect x="0" y="116" width="390" height="42" fill="#70C6D4"/>
    <Path d="M0 128 Q45 118 97 129 T195 128 T293 129 T390 128" fill="none" stroke="#D5F4F3" strokeWidth="3"/>
    <Path d="M0 147 Q45 137 96 148 T193 148 T290 147 T390 147" fill="none" stroke="#C7EDF1" strokeWidth="2"/>
    {van ? <>
      <Rect x="213" y="76" width="17" height="40" fill="#FCD2A7"/>
      <Rect x="231" y="67" width="29" height="49" fill="#FFF2D8"/>
      <Rect x="261" y="81" width="24" height="35" fill="#FF9A65"/>
      <Rect x="286" y="74" width="22" height="42" fill="#FFF0B8"/>
      <Rect x="312" y="61" width="17" height="55" fill="#FBD3A4"/>
      <Rect x="334" y="88" width="31" height="28" fill="#FFEAC2"/>
      <Line x1="326" x2="326" y1="45" y2="110" stroke={C.deep} strokeWidth="3"/>
      <Path d="M303 58 Q326 47 350 58 L341 63 H310 Z" fill={C.green}/>
      <Rect x="321" y="62" width="10" height="9" rx="1" fill={C.deep}/>
      <Line x1="326" x2="326" y1="41" y2="45" stroke={C.deep} strokeWidth="2"/>
      <Path d="M101 113 L111 91 L122 113Z M111 113 L124 85 L138 113Z" fill="#F2F8EF"/>
    </> : tor ? <>
      <Rect x="213" y="78" width="21" height="38" fill="#FFF0B8"/>
      <Rect x="236" y="67" width="21" height="49" fill="#FFE1D0"/>
      <Rect x="259" y="75" width="22" height="41" fill="#FFB16D"/>
      <Rect x="282" y="59" width="16" height="57" fill="#E7F5E4"/>
      <Rect x="303" y="82" width="31" height="34" fill="#FFD7B5"/>
      <Line x1="320" y1="19" x2="320" y2="115" stroke={C.green} strokeWidth="4"/>
      <Path d="M300 49 Q320 38 340 49 L333 54 H307 Z" fill={C.green}/>
      <Line x1="320" y1="12" x2="320" y2="27" stroke={C.green} strokeWidth="2"/>
    </> : <>
      <Rect x="209" y="90" width="35" height="26" fill="#F2D4AD"/>
      <Rect x="244" y="81" width="42" height="35" fill="#FFF0B8"/>
      <Rect x="286" y="88" width="45" height="28" fill="#F2D4AD"/>
      <Rect x="263" y="67" width="7" height="49" fill="#FFAC7A"/>
      <Path d="M240 81 L265 60 L290 81Z" fill={C.deep}/>
      <Path d="M200 92 L228 73 L252 92Z" fill={C.green}/>
    </>}
    <Path d="M0 122 Q14 114 31 122 L31 158 H0Z" fill={C.green}/>
    <Path d="M20 119 L39 72 L60 119Z M39 121 L63 62 L86 121Z" fill={C.green}/>
    <Rect x="37" y="112" width="5" height="18" fill={C.deep}/>
    <Path d="M367 120 L382 83 L397 120Z M357 125 L371 96 L385 125Z" fill={C.green}/>
  </Svg>
}
export function MiniCloud({size=34}:{size?:number}){
  return <Svg width={size} height={size} viewBox="0 0 64 64"><Path d="M16 45C8 45 6 39 6 33c0-7 6-13 13-13 2-11 11-17 21-14 7 2 12 8 13 16 7 0 11 5 11 11 0 7-5 12-12 12H16Z" transform="translate(-3 6) scale(.95)" fill="none" stroke={C.orange} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/><Path d="M44 9v-6M56 13l5-5M55 25h7" fill="none" stroke={C.orange} strokeWidth="3" strokeLinecap="round"/></Svg>
}
