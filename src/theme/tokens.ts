import { Platform } from 'react-native';

export const C = {
  cream: '#FFF9EF',
  green: '#073B29',
  deep: '#092E23',
  ink: '#12352B',
  orange: '#FF7900',
  orangeLight: '#FFE3C9',
  peach: '#FFE1D0',
  sky: '#BDEAF7',
  lime: '#E2EDBF',
  yellow: '#FFF0B8',
  white: '#FFFFFF',
  pale: '#FFFDF8',
  muted: '#557267',
  border: '#E6E7D9',
};
export const F = Platform.select({ios: 'AvenirNextRounded-DemiBold', android: 'sans-serif-rounded', default: 'system-ui'})!;
export const R = { sm: 14, md: 20, lg: 28, xl: 34 };
