import {observer} from 'mobx-react';
import React from 'react';

import {ScrollView, StyleSheet, Text, Pressable, View} from 'react-native';
import Channel from '../interfaces/Channel';
import channelStore from '../store/channels';
import navigatorStore, {DrawerPages} from '../store/navigator';

const ChannelTemplate = observer((props: {channel: Channel}) => {
  const handleStyle = {
    backgroundColor:
      navigatorStore.selectedChannelId === props.channel.channelID
        ? '#368dff'
        : 'transparent',
  };
  return (
    <Pressable
      android_ripple={{color: 'white', borderless: false}}
      onPress={() => {
        navigatorStore.setDrawerPage(DrawerPages.MAIN);
        navigatorStore.setSelectedChannelId(props.channel.channelID);
      }}>
      <View style={{flexDirection: 'row', padding: 10, paddingLeft: 5}}>
        <View style={{...styles.handle, ...handleStyle}} />
        <Text style={{color: 'white'}}>{props.channel.name}</Text>
      </View>
    </Pressable>
  );
});

export default observer(() => {
  if (!navigatorStore.selectedServerId) {
    return <View />;
  }
  const channels = channelStore.serverChannels(navigatorStore.selectedServerId);
  return (
    <ScrollView>
      {channels.map(channel => (
        <ChannelTemplate channel={channel} key={channel.channelID} />
      ))}
    </ScrollView>
  );
});
const styles = StyleSheet.create({
  handle: {
    width: 3,
    height: 20,
    marginRight: 5,
    borderRadius: 3,
  },
});
