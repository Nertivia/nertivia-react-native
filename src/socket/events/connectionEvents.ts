import {Socket} from 'socket.io-client';
import appStore from '../../store/app';
import channelStore from '../../store/channels';
import serverStore from '../../store/servers';
import {SuccessEvent} from './ConnectionEvents.types';

export const onConnect = (socket: Socket) => {
  socket.emit('authentication', {
    token: appStore.token,
  });
};

export const onSuccess = (_socket: Socket, data: SuccessEvent) => {
  const servers: any = {};
  const channels: any = {};

  for (let i = 0; i < data.user.servers.length; i++) {
    const server = data.user.servers[i];
    servers[server.server_id] = {
      avatar: server.avatar,
      banner: server.banner,
      creator: server.creator,
      default_channel_id: server.default_channel_id,
      name: server.name,
      server_id: server.server_id,
      verified: server.verified,
      channel_position: server.channel_position,
    };
    // server channels
    for (let x = 0; x < server.channels.length; x++) {
      const channel = server.channels[x];
      channels[channel.channelID] = {
        channelID: channel.channelID,
        name: channel.name,
        server_id: channel.server_id,
        lastMessaged: channel.lastMessaged,
        permissions: channel.permissions,
        icon: channel.icon,
        rateLimit: channel.rateLimit || 0,
      };
    }
  }

  channelStore.initChannels(channels);
  serverStore.initServers(servers);
};
