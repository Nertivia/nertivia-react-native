import React from 'react';
import {observer} from 'mobx-react';
import navigatorStore from '../store/navigator';
import {StyleSheet, Text, View} from 'react-native';
import channelStore from '../store/channels';
import Avatar from './Avatar';
import serverStore from '../store/servers';
import colors from '../colors.json';
export default observer(() => {
  const selectedChannelId = navigatorStore.selectedChannelId;
  const channel = channelStore.channels[selectedChannelId || ''];
  const server = serverStore.servers[channel?.server_id || ''];
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        {server && <Avatar avatar={server?.avatar} size={20} />}
        <Text style={{color: 'white', marginLeft: 3}}>
          {`${server?.name}#${channel?.name}` || 'Select A Channel'}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: colors.header,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#163866',
    borderRadius: 4,
    padding: 5,
  },
});
