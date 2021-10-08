import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TextInput, Pressable, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import messageStore from '../store/messages';
import navigatorStore from '../store/navigator';
import {socket} from '../socket';
import colors from '../colors.json';
export default observer(() => {
  const [inputValue, setInput] = useState('');

  const sendClicked = () => {
    const channelId = navigatorStore.selectedChannelId;
    if (!inputValue || !channelId || !socket.connected) {
      return;
    }
    const value = inputValue.trim();
    setInput('');
    messageStore.sendMessage(value, channelId);
  };
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setInput(text)}
        style={styles.input}
        placeholder="Type Your Message"
        value={inputValue}
        multiline={true}
        placeholderTextColor="rgba(255,255,255,0.4)"
      />
      <View style={styles.sendButton}>
        <Pressable
          onPress={sendClicked}
          style={{padding: 10}}
          android_ripple={{color: 'white', borderless: false}}>
          <Icon size={25} color="white" name="send" />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    maxHeight: '30%',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 5,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingLeft: 10,
    color: 'white',
    marginLeft: 10,
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    overflow: 'hidden',
    marginLeft: 10,
    borderRadius: 25,
  },
});
