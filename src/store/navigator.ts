import {makeAutoObservable} from 'mobx';

export enum DrawerPages {
  'LEFT_DRAWER' = 0,
  'MAIN' = 1,
  'RIGHT_DRAWER' = 2,
}

class NavigatorStore {
  selectedServerId = null as string | null;
  selectedChannelId = null as string | null;
  currentDrawerPage = DrawerPages.MAIN;

  constructor() {
    makeAutoObservable(this);
  }

  setDrawerPage(page: DrawerPages) {
    this.currentDrawerPage = page;
  }

  setSelectedServerId(id: string | null) {
    this.selectedServerId = id;
  }
  setSelectedChannelId(id: string | null) {
    this.selectedChannelId = id;
  }
}

const navigatorStore = new NavigatorStore();
export default navigatorStore;
