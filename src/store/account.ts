import {makeAutoObservable} from 'mobx';

class AccountStore {
  token = undefined as string | null | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string | null) {
    this.token = token;
  }
}

const accountStore = new AccountStore();
export default accountStore;
