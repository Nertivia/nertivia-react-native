import {makeAutoObservable} from 'mobx';
import {GithubReleaseData} from '../utils/github';

class AppStore {
  token = undefined as string | null | undefined;
  githubLatestRelease = null as GithubReleaseData | null;

  constructor() {
    makeAutoObservable(this);
  }

  setGithubRelease(version: GithubReleaseData | null) {
    this.githubLatestRelease = version;
  }

  setToken(token: string | null) {
    this.token = token;
  }
}

const appStore = new AppStore();
export default appStore;
