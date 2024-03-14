import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: 'https://frontend-exam.digitalfortress.dev/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

request.interceptors.request.use(async (config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      Cookies.remove('accessToken', { path: '' });
      Cookies.remove('refreshToken', { path: '' });
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default request;
