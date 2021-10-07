import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import popoutStore from '../store/popouts';

export default (props: {onToken: (token: string) => void; id: string}) => {
  const closePopout = () => {
    popoutStore.closePopout(props.id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={closePopout}>
          <Icon size={25} color="white" name="close" />
        </Pressable>
        <Text style={styles.headerText}>Complete Captcha</Text>
      </View>
      <WebView
        source={{uri: 'https://nertivia.net/captcha'}}
        onMessage={event => {
          props.onToken(event.nativeEvent.data);
          closePopout();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#2672d6',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 10,
    position: 'absolute',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
