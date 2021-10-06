/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {socket} from './src/socket';

socket.connect();

AppRegistry.registerComponent(appName, () => App);
