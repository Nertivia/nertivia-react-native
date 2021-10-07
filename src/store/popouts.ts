import {makeAutoObservable} from 'mobx';

interface Popout {
  id: string;
  component: any;
  data?: any
}

class PopoutStore {
  popouts: {[key: string]: Popout} = {};

  constructor() {
    makeAutoObservable(this);
  }
  openPopup(popout: Popout) {
    this.popouts[popout.id] = popout;
  }
  closePopout(id: string) {
    delete this.popouts[id];
  }
}

const popoutStore = new PopoutStore();
export default popoutStore;
