import axios from 'axios';

import { mode, api_url } from '@/config.json';

import useUserStore from '@/store/userStore';

const api = axios.create({
  baseURL: `${api_url[mode]}/api`,
});

const getHeader = () => {
  const token = useUserStore().getToken;
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

// interceptors
api.interceptors.request.use(
  (config) => {
    const newHeaders = { ...config.headers, ...getHeader() };
    // @ts-ignore
    config.headers = newHeaders;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.result === 'fail') return Promise.reject(data.message);
    return data.data;
  },
  (error) => Promise.reject(error)
);

export default api;
