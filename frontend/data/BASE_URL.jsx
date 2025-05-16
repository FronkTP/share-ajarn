import { Platform } from 'react-native';

export const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000'  // Android emulator localhost
  : 'http://127.0.0.1:5000'; // Web or iOS localhost