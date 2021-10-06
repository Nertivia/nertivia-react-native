import React from 'react';
import {autorun} from 'mobx';
import {useEffect} from 'react';
import navigatorStore from '../store/navigator';
import messageStore from '../store/messages';
import MessageLogs from './MessageLogs';
import {View} from 'react-native';
import ChatAreaHeader from './ChatAreaHeader';
import MessageInputArea from './MessageInputArea';

export default () => {
  useEffect(() => {
    const dispose = autorun(async () => {
      if (!navigatorStore.selectedChannelId) {
        return;
      }
      messageStore.fetchAndSaveMessages(navigatorStore.selectedChannelId);
    });

    return () => {
      dispose();
    };
  });
  return (
    <View style={{height: '100%'}}>
      <ChatAreaHeader />
      <MessageLogs />
      <MessageInputArea />
    </View>
  );
};
