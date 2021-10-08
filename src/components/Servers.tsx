import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView, View, Pressable, StyleSheet} from 'react-native';
import serverStore from '../store/servers';
import Server from '../interfaces/Server';
import navigatorStore from '../store/navigator';
import Avatar from './Avatar';
import colors from '../colors.json';

const ServerTemplate = observer(({server}: {server: Server}) => {
  const handleStyle = {
    backgroundColor:
      navigatorStore.selectedServerId === server.server_id
        ? colors.primary
        : 'transparent',
  };
  return (
    <Pressable
      onPress={() => navigatorStore.setSelectedServerId(server.server_id)}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 3}}>
        <View style={{...styles.handle, ...handleStyle}} />
        <Avatar avatar={server.avatar} />
      </View>
    </Pressable>
  );
});

export default observer(() => {
  const servers = Object.values(serverStore.servers);
  return (
    <View style={{width: 57}}>
      <ScrollView>
        {servers.map(s => (
          <ServerTemplate key={s.server_id} server={s} />
        ))}
      </ScrollView>
    </View>
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
