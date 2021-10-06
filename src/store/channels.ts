import {makeAutoObservable} from 'mobx';
import Channel from '../interfaces/Channel';

class ChannelStore {
  channels: {[key: string]: Channel} = {};

  constructor() {
    makeAutoObservable(this);
  }

  get serverChannels() {
    return (serverId: string) =>
      Object.values(this.channels).filter(
        channel => channel.server_id === serverId,
      );
  }
  initChannels(channels: any) {
    this.channels = channels;
  }
}

const channelStore = new ChannelStore();
export default channelStore;
