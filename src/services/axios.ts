import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'https://nertivia.net/api/',
});

export function getAxios() {
  return axiosInstance;
}
export function setAxios(token: string) {
  axiosInstance = axios.create({
    baseURL: 'https://nertivia.net/api/',
    headers: {
      authorization: token,
    },
  });
}
