import React from 'react';

import {View} from 'react-native';
import LeftDrawerHeader from './LeftDrawerHeader';
import ServerChannels from './ServerChannels';
import Servers from './Servers';

export default () => {
  return (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <Servers />
      <View style={{flex: 1}}>
        <LeftDrawerHeader />
        <ServerChannels />
      </View>
    </View>
  );
};
