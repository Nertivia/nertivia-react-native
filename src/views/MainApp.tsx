import React, {useEffect} from 'react';
import {ScrollView, Dimensions, StyleSheet, Text, View} from 'react-native';

import LeftDrawer from '../components/LeftDrawer';
import MessagesPage from '../components/MessagesPage';
import {socket} from '../socket';
import colors from '../colors.json';
const MainApp = () => {
  const mainWidth = Math.round(Dimensions.get('window').width);
  const drawerWidth = Math.round((mainWidth / 100) * 80);
  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      horizontal={true}
      snapToInterval={drawerWidth} //your element width
      decelerationRate={'fast'}
      contentOffset={{x: drawerWidth, y: 0}}
      pagingEnabled
      snapToAlignment={'center'}
      onMomentumScrollEnd={_e => {
        // console.log(e.target);
        // const left = Math.round(e.nativeEvent.contentOffset.x);
        // const leftDrawer = left === 0;
        // const main = left === drawerWidth;
        // // const rightDrawer =
        // //   left === drawerWidth + mainWidth - (mainWidth - drawerWidth);
        // navigatorStore.setDrawerPage(leftDrawer ? 0 : main ? 1 : 2);
      }}
      style={styles.scroll}>
      <View style={{...styles.drawerPage, width: drawerWidth}}>
        <LeftDrawer />
      </View>
      <View style={{...styles.mainPage, width: mainWidth}}>
        <MessagesPage />
      </View>
      <View style={{...styles.drawerPage, width: drawerWidth}}>
        <Text>Page</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
  },
  drawerPage: {
    height: '100%',
    backgroundColor: colors.drawer,
  },
  mainPage: {
    height: '100%',
  },
});

export default MainApp;
