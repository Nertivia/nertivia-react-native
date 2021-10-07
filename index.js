/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UpdateAvailable from './src/components/popouts/UpdateAvailable';
import {setAxios} from './src/services/axios';
import appStore from './src/store/app';
import popoutStore from './src/store/popouts';
import {getLatestRelease} from './src/utils/github';
import {changes} from './src/changelog.json';

AsyncStorage.getItem('token').then(token => {
  appStore.setToken(token);
  setAxios(token);
});

// check app update
getLatestRelease().then(release => {
  appStore.setGithubRelease(release);
  if (release.version !== changes[0].version) {
    popoutStore.openPopup({
      id: 'update-available',
      component: UpdateAvailable,
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
