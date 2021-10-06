import {makeAutoObservable} from 'mobx';
import Server from '../interfaces/Server';

class ServerStore {
  servers: {[key: string]: Server} = {};

  constructor() {
    makeAutoObservable(this);
  }

  initServers(servers: any) {
    this.servers = servers;
  }
}

const serverStore = new ServerStore();
export default serverStore;
