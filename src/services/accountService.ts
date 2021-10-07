import {AxiosResponse} from 'axios';
import {getAxios} from './axios';

interface LoginReturn {
  action: string;
  message: string;
  token: string;
  user: {
    avatar: string;
    id: string;
    tag: string;
    username: string;
  };
}

export const postLogin = (email: string, password: string, token?: string) => {
  return getAxios().post<any, AxiosResponse<LoginReturn>>('user/login', {
    email,
    password,
    token,
  });
};
