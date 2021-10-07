/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setAxios} from './src/services/axios';
import {socket} from './src/socket';
import accountStore from './src/store/account';

AsyncStorage.getItem('token').then(token => {
  accountStore.setToken(token);
  setAxios(token);
});

AppRegistry.registerComponent(appName, () => App);
