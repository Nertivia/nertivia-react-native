import {observer} from 'mobx-react';
import React from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Vibration,
} from 'react-native';
import Message, {Sending} from '../interfaces/Message';
import messageStore from '../store/messages';
import navigatorStore from '../store/navigator';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import friendlyDate from '../utils/date';
const MessageTemplate = ({
  item,
  grouped,
}: {
  item: Message;
  grouped?: boolean;
}) => {
  return (
    <Pressable
      onLongPress={() => {
        Vibration.vibrate(20);
      }}
      android_ripple={{color: 'black', borderless: false}}>
      <View style={styles.messageTemplate}>
        {!grouped ? (
          <Avatar avatar={item.creator.avatar} style={styles.avatar} />
        ) : (
          <View style={styles.groupAvatarGap} />
        )}
        <MessageBubble item={item} grouped={grouped} />
        <SentIcon item={item} />
      </View>
    </Pressable>
  );
};

const SentIcon = observer(({item}: {item: Message}) => {
  let sendingIcon;
  if (item?.sending === Sending.SENDING) {
    sendingIcon = 'schedule';
  }

  if (item?.sending === Sending.SENT) {
    sendingIcon = 'check';
  }
  return sendingIcon ? <Icon style={styles.icon} name={sendingIcon} /> : null;
});

const MessageBubble = React.memo(
  ({item, grouped}: {item: Message; grouped?: boolean}) => {
    return (
      <View style={styles.messageBubble}>
        {!grouped && (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.username}>{item.creator.username}</Text>
            <Text style={styles.date}>{friendlyDate(item.created)}</Text>
          </View>
        )}
        <Text>{item.message}</Text>
      </View>
    );
  },
);

export default observer(() => {
  const messages =
    messageStore.messages[navigatorStore.selectedChannelId || ''] || [];
  const keyExtractor = ({message}: any) =>
    message.tempID || (message.messageID as string);

  const isMoreThanMinute = (before: Message, after: Message) => {
    const minute = 60000;
    const beforeTime = before.created;
    const afterTime = after.created;
    return afterTime - beforeTime > minute;
  };
  const creatorMatch = (before: Message, after: Message) =>
    before.creator.id === after.creator.id;

  let groupCount = 0;

  const groupedMessages = messages
    .map((item, index) => {
      const beforeMessage = messages[index - 1];
      if (!beforeMessage || !creatorMatch(beforeMessage, item)) {
        groupCount = 0;
        return {message: item, component: <MessageTemplate item={item} />};
      }
      if (groupCount >= 4 || isMoreThanMinute(beforeMessage, item)) {
        groupCount = 0;
        return {message: item, component: <MessageTemplate item={item} />};
      }
      groupCount += 1;
      return {
        message: item,
        component: <MessageTemplate item={item} grouped={true} />,
      };
    })
    .reverse();

  // line below is needed because of mobx limitations.
  messages.length;
  return (
    <FlatList
      key={navigatorStore.selectedChannelId}
      style={styles.flatList}
      removeClippedSubviews={true}
      data={groupedMessages}
      keyExtractor={keyExtractor}
      renderItem={({item}) => item.component}
    />
  );
});

const styles = StyleSheet.create({
  flatList: {scaleY: -1, flexShrink: 1},
  messageBubble: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 4,
    margin: 2,
    padding: 3,
    flexShrink: 1,
    marginRight: 5,
  },
  messageTemplate: {alignSelf: 'flex-start', flexDirection: 'row', scaleY: -1},
  username: {fontWeight: 'bold'},
  date: {marginLeft: 3, color: 'rgba(0, 0, 0, 0.7)', fontSize: 12},
  icon: {color: 'white', marginTop: 'auto', marginBottom: 2},
  avatar: {marginTop: 5, marginLeft: 5, marginRight: 5},
  groupAvatarGap: {
    width: 50,
  },
});
