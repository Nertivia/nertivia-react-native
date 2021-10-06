import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import NotLoggedIn from './src/views/NotLoggedIn';
import MainApp from './src/views/MainApp';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotLoggedIn />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
  },
});
