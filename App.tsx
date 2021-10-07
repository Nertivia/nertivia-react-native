import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import NotLoggedIn from './src/views/NotLoggedIn';
import MainApp from './src/views/MainApp';
import {observer} from 'mobx-react';
import accountStore from './src/store/account';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {accountStore.token === null && <NotLoggedIn />}
      {accountStore.token && <MainApp />}
    </SafeAreaView>
  );
};

export default observer(App);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
  },
});
