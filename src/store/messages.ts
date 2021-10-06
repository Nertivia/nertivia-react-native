import {makeAutoObservable, runInAction} from 'mobx';
import Message, {Sending} from '../interfaces/Message';
import {fetchMessages, postMessage} from '../services/messageService';

class MessageStore {
  messages: {[key: string]: Message[]} = {};

  constructor() {
    makeAutoObservable(this);
  }
  async fetchAndSaveMessages(channelId: string) {
    if (this.messages[channelId]) {
      return;
    }
    const messages = await fetchMessages(channelId);
    if (messages) {
      runInAction(() => (this.messages[channelId] = messages.reverse()));
    }
  }
  addMessage(message: Message) {
    const messages = this.messages[message.channelID];
    if (!messages) {
      return;
    }
    messages.push(message);
    return messages[messages.length - 1];
  }
  sendMessage(value: string, channelId: string) {
    const message = this.addMessage({
      channelID: channelId,
      creator: {username: 'Fishie', tag: 'owoo', id: '1234'},
      message: value,
      tempID: Math.random().toString(),
      created: Date.now(),
      sending: Sending.SENDING,
      quotes: [],
    }) as Message;
    postMessage(value, channelId)
      .then(() => {
        runInAction(() => (message.sending = Sending.SENT));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const messageStore = new MessageStore();
export default messageStore;
