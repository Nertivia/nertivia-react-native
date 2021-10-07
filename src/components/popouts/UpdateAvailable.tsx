import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {changes} from '../../changelog.json';
import appStore from '../../store/app';
import popoutStore from '../../store/popouts';

export default (props: {id: string}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Nertivia Update Available</Text>
    <Text style={styles.information}>
      A new update is available. Would you like to update?
    </Text>
    <Text style={styles.otherInformation}>Current: {changes[0].version}</Text>
    <Text style={styles.otherInformation}>
      Latest: {appStore.githubLatestRelease?.version}
    </Text>
    <View style={styles.buttons}>
      <Pressable
        style={{flex: 1}}
        onPress={() => popoutStore.closePopout(props.id)}>
        <Text style={{...styles.button, ...styles.secondaryButton}}>Later</Text>
      </Pressable>
      <Pressable
        style={{flex: 1}}
        onPress={() =>
          Linking.openURL(appStore.githubLatestRelease?.downloadUrl as string)
        }>
        <Text style={styles.button}>Update Now</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 170,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 4,
    padding: 10,
    margin: 10,
    backgroundColor: '#292a2d',
    borderColor: '#4a4a4a',
    borderWidth: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  information: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
    textAlign: 'center',
  },
  otherInformation: {
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#368dff',
    margin: 5,
    padding: 10,
    color: 'white',
    borderRadius: 4,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#368dff',
    borderWidth: 1,
  },
});
