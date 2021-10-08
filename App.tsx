import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import NotLoggedIn from './src/views/NotLoggedIn';
import MainApp from './src/views/MainApp';
import {observer} from 'mobx-react';
import appStore from './src/store/app';
import popoutStore from './src/store/popouts';
import colors from './src/colors.json';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Contents />
      <Popouts />
    </SafeAreaView>
  );
};
const Contents = observer(() => (
  <View>
    {appStore.token === null && <NotLoggedIn />}
    {appStore.token && <MainApp />}
  </View>
));

const Popouts = observer(() => {
  return (
    <>
      {Object.values(popoutStore.popouts).map(popout => (
        <popout.component {...popout.data} key={popout.id} id={popout.id} />
      ))}
    </>
  );
});

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});
