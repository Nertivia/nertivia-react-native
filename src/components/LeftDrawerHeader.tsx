import React from 'react';
import {observer} from 'mobx-react';
import navigatorStore from '../store/navigator';
import serverStore from '../store/servers';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../colors.json';
export default observer(() => {
  const server = serverStore.servers[navigatorStore.selectedServerId || ''];
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>{server?.name || 'Servers'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: colors.header,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
