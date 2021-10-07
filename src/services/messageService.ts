import {socket} from '../socket';
import Message from '../interfaces/Message';
import {getAxios} from './axios';

export const fetchMessages = (channelId: string) => {
  return getAxios()
    .get<{messages: Message[]}>(`messages/channels/${channelId}`)
    .then(res => res.data.messages);
};
export const postMessage = (value: string, channelId: string) => {
  return getAxios().post(`messages/channels/${channelId}`, {
    message: value,
    socketID: socket.id,
    tempID: '0162464066510185439953062', // add temp id later
  });
};
