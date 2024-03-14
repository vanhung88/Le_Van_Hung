import axios from 'axios';
import queryString from 'query-string';
// import { SERVER_API } from '../constants/configs';

const request = axios.create({
  baseURL: 'https://frontend-exam.digitalfortress.dev/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// request.interceptors.request.use(async config => {
//   const token = localStorage.getItem('token') ?? null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     const decodedToken = jwt_decode(token);
//     const currentDate = new Date();
//     if (decodedToken.exp * 1000 < currentDate.getTime()) {
//       localStorage.clear();
//     }
//   }
//   return config;
// });

export default request;
