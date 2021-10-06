import {io} from 'socket.io-client';
import {CONNECT, RECEIVE_MESSAGE, SUCCESS} from '../socketEventConstants';
import * as connectionEvents from './events/connectionEvents';
import * as messageEvents from './events/messageEvents';

export const socket = io('https://nertivia.net' as string, {
  autoConnect: false,
  transports: ['websocket'],
});
socket.on(CONNECT, () => connectionEvents.onConnect(socket));
socket.on(SUCCESS, (data: any) => connectionEvents.onSuccess(socket, data));

// messageEvents
socket.on(RECEIVE_MESSAGE, (data: any) => messageEvents.onMessage(data));
