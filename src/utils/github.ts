export interface GithubReleaseData {
  version: string;
  downloadUrl: string;
}

export const getLatestRelease = async (): Promise<GithubReleaseData> => {
  const url =
    'https://api.github.com/repos/Nertivia/nertivia-react-native/releases';
  const res = await fetch(url);
  const data = await res.json();
  const version = data[0].tag_name.slice(1) as string;
  const downloadUrl = data[0].assets[0].browser_download_url as string;
  return {version, downloadUrl};
};
