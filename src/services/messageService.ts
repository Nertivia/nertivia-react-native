import {socket} from '../socket';
import axios from 'axios';
import Message from '../interfaces/Message';

const axiosInstance = axios.create({
  baseURL: 'https://nertivia.net/api/',
  headers: {
    authorization: 'NzY',
  },
});

export const fetchMessages = (channelId: string) => {
  return axiosInstance
    .get<{messages: Message[]}>(`messages/channels/${channelId}`)
    .then(res => res.data.messages);
};
export const postMessage = (value: string, channelId: string) => {
  return axiosInstance.post(`messages/channels/${channelId}`, {
    message: value,
    socketID: socket.id,
    tempID: '0162464066510185439953062', // add temp id later
  });
};
